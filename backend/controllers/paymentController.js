const Payment = require('../models/Payment');
const Booking = require('../models/Booking');

// 🔥 CREATE PAYMENT (UPLOAD BUKTI - SESUAI FRONTEND)
exports.createPayment = async (req, res) => {
  try {
    const bookingId = req.params.id;

    const payment = new Payment({
      bookingId,
      userId: req.body.userId || null,
      amount: 0,       // sementara (karena frontend belum kirim)
      deposit: 0,
      total: 0,
      proof: req.file ? `/uploads/${req.file.filename}` : null,
      status: 'pending'
    });

    await payment.save();

    // 🔥 OPTIONAL: update status booking
    await Booking.findByIdAndUpdate(bookingId, {
      status: 'pending'
    });

    res.status(201).json({
      msg: 'Payment uploaded',
      payment
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ VERIFY PAYMENT (ADMIN)
exports.verifyPayment = async (req, res) => {
  try {
    const { paymentId, status } = req.body;

    const payment = await Payment.findById(paymentId);
    if (!payment) {
      return res.status(404).json({ msg: 'Payment not found' });
    }

    payment.status = status;
    await payment.save();

    // 🔥 AUTO UPDATE BOOKING
    if (status === 'verified') {
      await Booking.findByIdAndUpdate(payment.bookingId, {
        status: 'confirmed'
      });
    }

    res.json(payment);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ GET PAYMENT DETAIL
exports.getPayment = async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.id)
      .populate('bookingId')
      .populate('userId');

    res.json(payment);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ REFUND DEPOSIT
exports.refundDeposit = async (req, res) => {
  try {
    const { paymentId } = req.body;

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