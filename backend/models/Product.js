const mongoose = require('mongoose');

// Product Schema for Chocolate products
const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true }, // URL or path to image
    category: { type: String, default: 'chocolate' },
    stock: { type: Number, default: 100 },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Product', productSchema);
