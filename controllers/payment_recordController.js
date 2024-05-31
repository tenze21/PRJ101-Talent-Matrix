const PaymentRecord = require('../model/payment_recordModel');

// Get all payment records
exports.getAllRecords = async (req, res) => {
  try {
    const records = await PaymentRecord.find();
    res.json(records);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new payment record
exports.createRecord = async (req, res) => {
  const { projectId, clientId, amount, status } = req.body;

  const newRecord = new PaymentRecord({
    projectId,
    clientId,
    amount,
    status,
  });

  try {
    const savedRecord = await newRecord.save();
    res.status(201).json(savedRecord);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a payment record
exports.deleteRecord = async (req, res) => {
  try {
    const record = await PaymentRecord.findById(req.params.id);
    if (!record) return res.status(404).json({ message: 'Record not found' });

    await record.remove();
    res.json({ message: 'Record deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
