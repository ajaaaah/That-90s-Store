const express = require('express');
const router = express.Router();

const { Product } = require('../models/product');
const { Category } = require('../models/category');

//CRUD operations for products

// Get all products
router.get(`/`, async (req, res) => {
    const productList = await Product.find()

    if(!productList) { return res.status(500).json({ success: false, message: 'No products found' });}

    res.send(productList);
});

//Get a product by ID
router.get(`/:id`, async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (!product) {
        return res.status(404).json({ success: false, message: 'Product not found' });
    }

    res.send(product);
});

// Add a new product
router.post(`/`, async (req, res) => {
    const category = Category.findById(req.body.category);
    if (!category) return res.status(400).send('Invalid category');

    const newProduct = new Product({
        name: req.body.name,
        image: req.body.image,
        images: req.body.images, // Array of image URLs
        description: req.body.description,
        price: req.body.price,
        isFeatured: req.body.isFeatured,
        category: req.body.category
    })

    // Validate required fields
    if (!req.body.name || !req.body.price || !req.body.category) {
        return res.status(400).json({ success: false, message: 'Name, price, and category are required' });
    }

    product = await newProduct.save();

    if (!product) {
        return res.status(500).json({ success: false, message: 'The product could not be created' });
    }
    res.status(201).json(product);

})

//Update a product
router.put(`/:id`, async (req, res) => {
    const product = await Product.findByIdAndUpdate(
        req.params.id,
        {
            name: req.body.name,
            image: req.body.image,
            images: req.body.images, // Array of image URLs
            description: req.body.description,
            price: req.body.price,
            isFeatured: req.body.isFeatured,
            category: req.body.category
        },
        { new: true }
    );

    if (!product) {
        return res.status(404).json({ success: false, message: 'Product not found' });
    }

    res.send(product);
});

//Delete a product
router.delete(`/:id`, (req, res) => {
    Product.findByIdAndDelete(req.params.id).then((product) => {
        if (product) {
            return res.status(200).json({ success: true, message: 'Product deleted successfully' });
        }
        else {
            return res.status(404).json({ success: false, message: 'Product not found' });
        }
    }).catch((err) => {
        return res.status(500).json({ success: false, error: err });
    });
})

module.exports = router;