const express = require('express');
const router = express.Router();

// //Get all orders
router.get(`/`, async (req, res) => {
    const orderList = await Order.find().populate('user', 'name')

    if (!orderList) {
        return res.status(500).json({ success: false, message: 'No orders found' });
    }

    res.send(orderList);
});
module.exports = router;