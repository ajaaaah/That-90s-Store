const express = require('express');
const app = express();
const router = express.Router();

//Get all orders
router.get(`/`, async (req, res) => {
    const orderList = await Order.find().populate('user', 'name'); // Populate user details

    if (!orderList) {
        return res.status(500).json({ success: false, message: 'No orders found' });
    }

    res.send(orderList);
});

// Get an order by ID
router.get(`/:id`, async (req, res) => {
    const order = await Order.findById(req.params.id)
    .populate('user', 'name'); // Populate user details
    .populate({
        path: 'orderItems', populate: {
            path: 'product', populate: 'category'}
    });

    if (!order) {
        return res.status(404).json({ success: false, message: 'Order not found' });
    }

    res.send(order);
});

// Add a new order
router.post(`/`, (req, res) => {
    const newOrder = new Order({
        id: req.body.id,
        orderItems: req.body.orderItems,
        shippingAddress: req.body.shippingAddress,
        totalPrice: req.body.totalPrice,
        user: req.body.user
    });

    if (!newOrder) {
        return res.status(400).json({ success: false, message: 'The order could not be created' });
    }

    newOrder.save().then((createdOrder) => {
        res.status(201).json(createdOrder);
    })
    .catch((err) => {
        res.status(500).json({ error: err, success: false });
    });
}); 