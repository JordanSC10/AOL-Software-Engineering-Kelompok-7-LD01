const Booking = require('../models/booking');

const populateBookingQuery = (query) => query
  .populate({
    path: 'equipmentId',
    populate: {
      path: 'ownerId',
      select: 'name whatsapp bankName accountNumber accountHolder ownerQR'
    }
  })
  .populate('userId');

const formatBooking = (booking) => ({
  ...booking._doc,
  equipment: booking.equipmentId
});

exports.createBooking = async (req, res) => {
  try {
    const { userId, equipmentId, startDate, endDate, totalPrice } = req.body;

    if (!equipmentId) {
      return res.status(400).json({ msg: 'equipmentId is required' });
    }

    let existing = null;

    if (startDate && endDate) {
      existing = await Booking.findOne({
        equipmentId,
        status: { $nin: ['rejected', 'cancelled'] },
        startDate: { $lte: new Date(endDate) },
        endDate: { $gte: new Date(startDate) }
      });
    }

    if (existing) {
      return res.status(400).json({
        msg: 'Tanggal sudah dibooking'
      });
    }

    const booking = new Booking({
      userId: userId || null,
      equipmentId,
      startDate: startDate || null,
      endDate: endDate || null,
      totalPrice: Number(totalPrice || 0),
      status: 'pending'
    });

    await booking.save();

    const populated = await populateBookingQuery(
      Booking.findById(booking._id)
    );

    res.status(201).json(formatBooking(populated));

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getBookings = async (req, res) => {
  try {
    const bookings = await populateBookingQuery(Booking.find());
    const formatted = bookings.map(formatBooking);

    res.json(formatted);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateBookingStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (!['pending', 'approved', 'rejected', 'confirmed', 'cancelled', 'completed'].includes(status)) {
      return res.status(400).json({ msg: 'Invalid booking status' });
    }

    const booking = await populateBookingQuery(
      Booking.findByIdAndUpdate(
        req.params.id,
        { status },
        { new: true }
      )
    );

    if (!booking) {
      return res.status(404).json({ msg: 'Booking not found' });
    }

    res.json(formatBooking(booking));

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
