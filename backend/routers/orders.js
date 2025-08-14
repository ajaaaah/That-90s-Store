const express = require('express');
const router = express.Router();
const { Order } = require('../models/order'); // Import the Order model
const {OrderItem} = require('../models/orderItem'); // Import the OrderItem model

// Get all orders
router.get(`/`, async (req, res) => {
    const orderList = await Order.find().populate('user', 'name')

    if (!orderList) {
        return res.status(500).json({ success: false, message: 'No orders found' });
    }

    res.send(orderList);
});

// Get an order by ID
router.get('/:id', async (req, res) => {
    const order = await Order.findById(req.params.id)
    .populate('user', 'name')
    .populate({
        path: 'orderItems', populate: {
            path: 'product', select: 'category'}
    });

    if (!order) {
        return res.status(500).json({ success: false, message: 'Order not found' });
    }

    res.status(200).send(order);
});

// Create a new order
router.post(`/`, async (req, res) => {
    const orderItems = Promise.all( req.body.orderItems.map(async orderItem => {
        let newOrderItem = new OrderItem({
            quantity: orderItem.quantity,
            product: orderItem.product
        });

        newOrderItem = await newOrderItem.save();

        return newOrderItem._id;
    }))

    const orderItemsResolved = await orderItemsIds;

    const totalPrices = await Promise.all(orderItemsResolved.map(async orderItemId => {
        const orderItem = await OrderItem.findById(orderItemId).populate('product', 'price');
        const totalPrice = orderItem.product.price * orderItem.quantity;
        return totalPrice;
    }));

    const totalPrice = totalPrices.reduce((a, b) => a + b, 0);

    let order = new Order({
        orderItems: orderItemsResolved,
        shippingAddress: req.body.shippingAddress,
        totalPrice: totalPrice,
        user: req.body.user
    });

    order = await order.save();

    if (!order) {
        return res.status(400).json({ success: false, message: 'The order could not be created' });
    }

    res.send(order);
});

// Update an order's status
router.put('/:id', async (req, res) => {
    const order = await Order.findByIdAndUpdate(
        req.params.id,
        {
            status: req.body.status
        },
        { new: true }
    );

    if (!order) {
        return res.status(400).json({ success: false, message: 'The order could not be updated' });
    }

    res.send(order);
});

// Delete an order by ID
router.delete('/:id', (req,res) =>{
    Order.findByIdAndDelete(req.params.id).then(async order => {
        if(order) {
            await order.orderItems.map(async orderItem => {
                await OrderItem.findByIdAndDelete(orderItem);
            })
            return res.status(200).json({ success: true, message: 'The order has been deleted' });
        } else {
            return res.status(404).json({ success: false, message: 'Order not found' });
        }   
    }).catch(err => {
        return res.status(500).json({ success: false, error: err });
    });
})

//Get total sales
router.get('/get/totalsales', async (req, res) => { 
    const totalSales = await Order.aggregate([
        { $group: { _id: null, totalSales: { $sum: '$totalPrice' }}}
    ])

    if (!totalSales) {
        return res.status(500).json({ success: false, message: 'No sales found' });
    }

    res.send({ totalSales: totalSales.pop().totalSales });
})

//get orders count
router.get('/get/count', async (req, res) => {
    const orderCount = await Order.countDocuments((count) => count);

    if (!orderCount) {
        return res.status(500).json({ success: false, message: 'No orders found' });
    }

    res.send({ orderCount: orderCount });
});

//get user orders
router.get('/get/userorders/:userid', async (req, res) => {
    const userOrders = await Order.find({ user: req.params.userid}).populate({
        path: 'orderItems', populate: {
            path: 'product', select: 'category'}
    }).sort({ dateOrdered: -1 });

    if (!userOrders) {
        return res.status(500).json({ success: false, message: 'No orders found for this user' });
    }
    res.send(userOrders);
});

module.exports = router;