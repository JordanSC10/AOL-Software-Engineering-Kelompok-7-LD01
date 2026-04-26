const express = require('express');
const router = express.Router();

const bookingController = require('../controllers/bookingController');
const paymentController = require('../controllers/paymentController'); // ➕ TAMBAH
const upload = require('../middleware/upload'); // ➕ TAMBAH

// BOOKING
router.post('/', bookingController.createBooking);
router.get('/', bookingController.getBookings);
router.put('/:id', bookingController.updateBookingStatus);

// 🔥 UPLOAD PAYMENT (yang frontend butuh)
router.post('/payment/:id', upload.single('payment'), paymentController.createPayment);

module.exports = router;