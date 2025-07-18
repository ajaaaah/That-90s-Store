const express = require('express');
const app = express();
const router = express.Router();

const { Product } = require('../models/product');

// Get all products
app.get(`/`, async (req, res) => {
    const productList = await Product.find()

    if(!productList) {
        return res.status(500).json({ success: false, message: 'No products found' });
    }

    res.send(productList);
    });

// Add a new product
app.post(`/`, (req, res) => {
    //Data would come from the frontend
    const newProduct = new Product({
        name: req.body.name,
        image: req.body.image,
        description: req.body.description,
        price: req.body.price
    })
    
    newProduct.save().then((createdProduct => {
        // The createdProduct is the product that was saved to the database
        res.status(201).json(createdProduct)
    }))
    .catch((err) => {  
        res.status(500).json({ error: err, sucess: false })
    })

})

module.exports = router;