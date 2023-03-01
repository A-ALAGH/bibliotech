const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

const {
  createlivre,
  getlivres,
  getlivreById,
  updatelivre,
  deletelivre,
  borrowlivre,
  returnlivre,
  getlivresCount,
} = require('../controllers/livreController');

// @route   POST api/livres
// @desc    Create a livre
// @access  Private
router.post('/', auth, createlivre);

// @route   GET api/livres
// @desc    Get all livres
// @access  Public
router.get('/', getlivres);

// @route   GET api/livres/:id
// @desc    Get a livre by id
// @access  Public
router.get('/:id', getlivreById);

// @route   PUT api/livres/:id
// @desc    Update a livre
// @access  Private
router.put('/:id', auth, updatelivre);

// @route   DELETE api/livres/:id
// @desc    Delete a livre
// @access  Private
router.delete('/:id', auth, deletelivre);

// @route   PUT api/livres/borrow/:id
// @desc    Borrow a livre
// @access  Private
router.put('/borrow/:id', auth, borrowlivre);

// @route   PUT api/livres/return/:id
// @desc    Return a livre
// @access  Private
router.put('/return/:id', auth, returnlivre);

// @route   GET api/livres/count/:title
// @desc    Get the number of livres with a given title
// @access  Public
router.get('/count/:title', getlivresCount);

module.exports = router;
