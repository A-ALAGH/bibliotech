const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const { check } = require('express-validator')
const {
  createCategory,
  getCategories,
  getCategoryById,
  updateCategory,
  deleteCategory
} = require('../controllers/categoryController')

// @route   POST api/categories
// @desc    Create a category
// @access  Private/Admin
router.post(
  '/',
  [
    check('name', 'Name is required').not().isEmpty()
  ],
  createCategory
)

// @route   GET api/categories
// @desc    Get all categories
// @access  Public
router.get('/', getCategories)

// @route   GET api/categories/:id
// @desc    Get category by ID
// @access  Public
router.get('/:id', getCategoryById)

// @route   PUT api/categories/:id
// @desc    Update a category
// @access  Private/Admin
router.put(
  '/:id',
  [
    check('name', 'Name is required').not().isEmpty()
  ],
  updateCategory
)

// @route   DELETE api/categories/:id
// @desc    Delete a category
// @access  Private/Admin
router.delete('/:id', deleteCategory)

module.exports = router
