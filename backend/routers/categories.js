const express = require('express');
const app = express();
const router = express.Router();

const { Category } = require('../models/category');

// Get all categories
router.get(`/`, async (req, res) => {
    const categoryList = await Category.find();

    if (!categoryList) {
        return res.status(500).json({ success: false, message: 'No categories found' });
    }

    res.send(categoryList);
});

// Get a category by ID
router.get(`/:id`, async (req, res) => {
    const category = await Category.findById(req.params.id);

    if (!category) {
        return res.status(404).json({ success: false, message: 'Category not found' });
    }

    res.send(category);
});

// Add a new category
router.post(`/`, (req, res) => {
    const newCategory = new Category({
        id: req.body.id,
        name: req.body.name,
        color: req.body.color,
        image: req.body.image
    });

    if(!newCategory){
        return res.status(400).json({ success: false, message: 'the category could not be created' });
    }

    if(!newCategory.id || !newCategory.name || !newCategory.color) {
        return res.status(400).json({ success: false, message: 'Please provide all required fields' });
    }

    res.send(newCategory);
});

// Update a category
router.put(`/:id`, async (req, res) => {
    const category = await Category.findByIdAndUpdate(
        req.params.id,
        {
            id: req.body.id,
            name: req.body.name,
            color: req.body.color,
            image: req.body.image
        },
        { new: true }
    );

    if (!category) {
        return res.status(404).json({ success: false, message: 'Category not found' });
    }

    res.send(category);
});

// Delete a category
router.delete(`/:id`, async (req, res) => {
    const category = await Category.findByIdAndRemove(req.params.id);

    if (!category) {
        return res.status(404).json({ success: false, message: 'Category not found' });
    }

    res.send({ success: true, message: 'Category deleted successfully' });
});

module.exports = router;
