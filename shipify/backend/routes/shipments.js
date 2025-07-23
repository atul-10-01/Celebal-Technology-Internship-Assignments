const express = require('express');
const Shipment = require('../models/Shipment');
const auth = require('../middleware/auth');

const router = express.Router();

// Create new shipment
router.post('/', auth, async (req, res) => {
  try {
    const { sender, receiver, size, address } = req.body;
    if (!sender || !receiver || !size || !address) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    const shipment = new Shipment({
      sender,
      receiver,
      size,
      address,
      user: req.user._id
    });
    await shipment.save();
    res.status(201).json(shipment);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all shipments for logged-in user
router.get('/', auth, async (req, res) => {
  try {
    const shipments = await Shipment.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(shipments);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get shipment by ID (tracking number)
router.get('/:id', auth, async (req, res) => {
  try {
    const shipment = await Shipment.findOne({ _id: req.params.id, user: req.user._id });
    if (!shipment) return res.status(404).json({ message: 'Shipment not found' });
    res.json(shipment);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// (Optional) Update shipment status
router.patch('/:id/status', auth, async (req, res) => {
  try {
    const { status } = req.body;
    const shipment = await Shipment.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      { status },
      { new: true }
    );
    if (!shipment) return res.status(404).json({ message: 'Shipment not found' });
    res.json(shipment);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router; 