const mongoose = require('mongoose');

const { orderItems } = require('./orderItem'); // Import the Order item model
const { User } = require('./user'); // Import the User model

const orderSchema = new mongoose.Schema({
    id: { type: String, required: true },
    orderItems: [orderItemSchema], // Assuming orderItemSchema is defined elsewhere
    shippingAddress: {
        street: { type: String, required: true },
        city: { type: String, required: true },
        zip: { type: String, required: true },
        country: { type: String, required: true }
    },
    totalPrice: { type: Number, required: true },
    user: User, // Reference to the User model,
    dateOrdered: { type: Date, default: Date.now }
});

// Create a model for the order schema
// This model will be used to interact with the orders collection in MongoDB
exports.Order = mongoose.model('Order', ordersSchema);
