const mongoose = require('mongoose');


const productSchema = new mongoose.Schema({
    name: { type: String}, 
    image: { type: String},
    images: { type: [String] }, // Array of image URLs
    description: { type: String},
    price: { type: Number, required: true },
    isFeatured: { type: Boolean, default: false },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
});

// Create a model for the product schema
// This model will be used to interact with the products collection in MongoDB
exports.Product = mongoose.model('Product', productSchema);
