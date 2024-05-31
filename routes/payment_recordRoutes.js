const express = require('express');
const router = express.Router();
const paymentRecordController = require('../controllers/payment_recordController');

router.get('/', paymentRecordController.getAllRecords);
router.post('/', paymentRecordController.createRecord);
router.delete('/:id', paymentRecordController.deleteRecord);

module.exports = router;
