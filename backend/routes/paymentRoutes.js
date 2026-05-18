const express = require('express');
const router = express.Router();

const paymentController = require('../controllers/paymentController');
const upload = require('../middleware/upload');

// POST /payments - handles JSON body from Payment page
router.post('/', paymentController.createPayment);

router.get('/:id', paymentController.getPayment);
router.put('/verify', paymentController.verifyPayment);
router.post('/refund', paymentController.refundDeposit);

module.exports = router;