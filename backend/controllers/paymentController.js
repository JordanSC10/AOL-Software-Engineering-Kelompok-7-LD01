const Payment = require('../models/payment');
const Booking = require('../models/booking');

const normalizePaymentMethod = (method = '') => {
  const value = method.toString().trim().toLowerCase();

  if (value.includes('qris')) return 'qris';
  if (value.includes('cod')) return 'cod';

  return 'transfer';
};

exports.createPayment = async (req, res) => {
  try {
    const bookingId = req.params.id || req.body.bookingId;

    if (!bookingId) {
      return res.status(400).json({ msg: 'bookingId is required' });
    }

    const booking = await Booking.findById(bookingId);

    if (!booking) {
      return res.status(404).json({ msg: 'Booking not found' });
    }

    const amount = Number(req.body.amount || booking.totalPrice || 0);
    const shippingFee = Number(req.body.shippingFee || 10000);
    const method = normalizePaymentMethod(req.body.method);
    const total = Number(req.body.total || amount + shippingFee);

    const payment = new Payment({
      bookingId,
      userId: req.body.userId || booking.userId || null,
      amount,
      deposit: Number(req.body.deposit || 0),
      total,
      shippingFee,
      method,
      proof: req.file ? `/uploads/${req.file.filename}` : req.body.proof || null,
      ownerQR: req.body.ownerQR || null,
      codLocation: req.body.codLocation || null,
      status: 'pending'
    });

    await payment.save();

    await Booking.findByIdAndUpdate(bookingId, {
      status: 'pending'
    });

    res.status(201).json({
      msg: method === 'cod'
        ? 'COD booking created. Please confirm pickup or delivery details with owner.'
        : 'Payment submitted. Waiting for payment to be verified by owner.',
      payment
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.verifyPayment = async (req, res) => {
  try {
    const { paymentId, status } = req.body;

    if (!paymentId) {
      return res.status(400).json({ msg: 'paymentId is required' });
    }

    if (!['pending', 'verified', 'rejected', 'refunded'].includes(status)) {
      return res.status(400).json({ msg: 'Invalid payment status' });
    }

    const payment = await Payment.findById(paymentId);

    if (!payment) {
      return res.status(404).json({ msg: 'Payment not found' });
    }

    payment.status = status;
    await payment.save();

    if (status === 'verified') {
      await Booking.findByIdAndUpdate(payment.bookingId, {
        status: 'confirmed'
      });
    }

    if (status === 'rejected') {
      await Booking.findByIdAndUpdate(payment.bookingId, {
        status: 'rejected'
      });
    }

    res.json(payment);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getPayment = async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.id)
      .populate('bookingId')
      .populate('userId');

    if (!payment) {
      return res.status(404).json({ msg: 'Payment not found' });
    }

    res.json(payment);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.refundDeposit = async (req, res) => {
  try {
    const { paymentId } = req.body;

    if (!paymentId) {
      return res.status(400).json({ msg: 'paymentId is required' });
    }

    const payment = await Payment.findById(paymentId);

    if (!payment) {
      return res.status(404).json({ msg: 'Payment not found' });
    }

    payment.status = 'refunded';
    await payment.save();

    res.json({
      msg: 'Deposit refunded',
      payment
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
