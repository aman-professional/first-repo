const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

// POST new order
router.post('/', async (req, res) => {
    // Validate required fields
    if (!req.body.name || !req.body.phone || !req.body.location || !req.body.cartItems) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    const order = new Order({
        name: req.body.name,
        phone: req.body.phone,
        location: req.body.location,
        cartItems: req.body.cartItems,
        totalAmount: req.body.totalAmount,
        paymentMethod: req.body.paymentMethod || 'COD',
        paymentStatus: req.body.paymentStatus || 'pending',
        paymentProof: req.body.paymentProof || ''
    });

    try {
        const newOrder = await order.save();
        res.status(201).json(newOrder);
    } catch (err) {
        res.status(400).json({ message: 'Error creating order', error: err.message });
    }
});

// GET all orders (for admin)
router.get('/', async (req, res) => {
    try {
        const orders = await Order.find().sort({ createdAt: -1 });
        res.json(orders);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching orders', error: err.message });
    }
});

// GET single order by ID
router.get('/:id', async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.json(order);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching order', error: err.message });
    }
});

// PATCH cancel order
router.patch('/:id/cancel', async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        order.status = 'cancelled';
        order.cancellationReason = req.body.reason || 'No reason provided';

        const updatedOrder = await order.save();
        res.json(updatedOrder);
    } catch (err) {
        res.status(400).json({ message: 'Error cancelling order', error: err.message });
    }
});

// PATCH verify payment
router.patch('/:id/verify-payment', async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        order.paymentStatus = 'Verified';

        const updatedOrder = await order.save();
        res.json(updatedOrder);
    } catch (err) {
        res.status(400).json({ message: 'Error verifying payment', error: err.message });
    }
});

// PATCH deliver order
router.patch('/:id/deliver', async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        order.status = 'delivered';

        const updatedOrder = await order.save();
        res.json(updatedOrder);
    } catch (err) {
        res.status(400).json({ message: 'Error marking order as delivered', error: err.message });
    }
});

module.exports = router;
