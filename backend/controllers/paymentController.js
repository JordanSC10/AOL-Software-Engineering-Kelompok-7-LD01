const Payment = require('../models/Payment');
const Booking = require('../models/Booking');


exports.createPayment = async (req, res) => {
  try {
    const { bookingId, amount, deposit } = req.body;

    const total = amount + deposit;

    const payment = new Payment({
    bookingId,
    userId: req.body.userId || null,
    amount,
    deposit,
    total: Number(amount) + Number(deposit),
    proof: req.file ? `/uploads/${req.file.filename}` : null
});

    await payment.save();

    res.status(201).json(payment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.verifyPayment = async (req, res) => {
  try {
    const { paymentId, status } = req.body;

    const payment = await Payment.findById(paymentId);
    if (!payment) return res.status(404).json({ msg: 'Payment not found' });

    payment.status = status;
    await payment.save();

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


exports.refundDeposit = async (req, res) => {
  try {
    const { paymentId } = req.body;

    const payment = await Payment.findById(paymentId);
    if (!payment) return res.status(404).json({ msg: 'Payment not found' });


    payment.status = 'refunded';
    await payment.save();

    res.json({ msg: 'Deposit refunded', payment });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};