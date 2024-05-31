const mongoose = require('mongoose');

const paymentRecordSchema = new mongoose.Schema({
  projectId: {
    type: Number,
    required: true,
  },
  clientId: {
    type: Number,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ['Ongoing', 'Completed'],
    required: true,
  },
}, { timestamps: true });

module.exports = mongoose.model('PaymentRecord', paymentRecordSchema);
