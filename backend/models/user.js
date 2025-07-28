const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    id: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    street: { type: String, required: true },
    city: { type: String, required: true },
    zip: { type: String, required: true },
    country: { type: String, required: true },
    phone: { type: String, required: true },
    isAdmin: { type: Boolean, default: false }
});

// Create a model for the user schema
// This model will be used to interact with the users collection in MongoDB
exports.User = mongoose.model('User', userSchema);