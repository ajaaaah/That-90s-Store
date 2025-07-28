const mongoose = require('mongoose');


const categorySchema = new mongoose.Schema({
    name: { type: String, required: true },
    color: { type: String, required: true },
    image: { type: String, required: true },
});

// Create a model for the category schema
// This model will be used to interact with the categories collection in MongoDB
exports.Category = mongoose.model('Category', categorySchema);