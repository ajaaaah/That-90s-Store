const express = require('express');
const router = express.Router();

const { User } = require('../models/user');

// Get all users
router.get(`/`, async (req, res) => {
    const userList = await User.find();

    if (!userList) {
        return res.status(500).json({ success: false, message: 'No users found' });
    }

    res.send(userList);
});


module.exports = router;