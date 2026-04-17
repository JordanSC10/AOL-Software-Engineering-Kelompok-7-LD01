const Booking = require('../models/Booking');

// ✅ CREATE BOOKING
exports.createBooking = async (req, res) => {
  try {
    const { userId, equipmentId, startDate, endDate, totalPrice } = req.body;

    const booking = new Booking({
      userId,
      equipmentId,
      startDate,
      endDate,
      totalPrice
    });

    await booking.save();

    res.status(201).json(booking);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ GET ALL BOOKINGS
exports.getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ UPDATE STATUS
exports.updateBookingStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    res.json(booking);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};