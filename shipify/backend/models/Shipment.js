const mongoose = require('mongoose');

const shipmentSchema = new mongoose.Schema({
  sender: { type: String, required: true },
  receiver: { type: String, required: true },
  size: { type: String, enum: ['Small', 'Medium', 'Large'], required: true },
  address: { type: String, required: true },
  status: { type: String, enum: ['Pending', 'In Transit', 'Delivered'], default: 'Pending' },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });

module.exports = mongoose.model('Shipment', shipmentSchema); 