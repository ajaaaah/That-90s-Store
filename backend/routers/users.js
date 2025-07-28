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

// Get a user by ID
router.get('/:id', async (req,res) => {
    const user = await User.findById(req.params.id);

    if (!user) {
        return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.send(user);
})

//Create a new user
router.post(`/`, async (req, res) => {
    let user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        street: req.body.street,
        city: req.body.city,
        zip: req.body.zip,
        country: req.body.country,
        phone: req.body.phone,
        isAdmin: req.body.isAdmin || false

    });

    user = await user.save();

    if(!user){
        return res.status(400).json({ success: false, message: 'the user could not be created' });
    }

    res.send(user);
});

//Update a user 
router.put('/:id',async (req,res) => {
    const user = await User.findByIdAndUpdate(
        req.params.id,
        {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            street: req.body.street,
            city: req.body.city,
            zip: req.body.zip,
            country: req.body.country,
            phone: req.body.phone,
            isAdmin: req.body.isAdmin
        },
        { new: true }
    );

    if(!user) {
        return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.send(user);
})


//Delete a user
router.delete('/:id', async (req, res) => {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
        return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.send({ success: true, message: 'User deleted successfully' });
});

module.exports = router;