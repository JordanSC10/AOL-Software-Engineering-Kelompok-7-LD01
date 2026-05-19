const express = require('express');
const router = express.Router();

const paymentController = require('../controllers/paymentController');
const upload = require('../middleware/upload');

// Route untuk membuat pembayaran dengan upload bukti transfer
router.post('/', upload.single('proof'), paymentController.createPayment);

// Route untuk verifikasi, ambil data, dan refund
router.put('/verify', paymentController.verifyPayment);
router.get('/:id', paymentController.getPayment);
router.post('/refund', paymentController.refundDeposit);

module.exports = router;