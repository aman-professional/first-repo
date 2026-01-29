const mongoose = require('mongoose');

// Order Schema - stores customer orders with location
const orderSchema = new mongoose.Schema({
    name: { type: String, required: true },
    phone: { type: String, required: true },
    location: {
        latitude: { type: Number, required: true },
        longitude: { type: Number, required: true }
    },
    cartItems: { type: Array, required: true },
    totalAmount: { type: Number, required: true },
    status: { type: String, default: 'pending' },
    cancellationReason: { type: String, default: '' },
    paymentMethod: { type: String, required: true, default: 'COD' },
    paymentStatus: { type: String, default: 'pending' },
    paymentProof: { type: String, default: '' },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', orderSchema);
