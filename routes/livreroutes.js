const express = require('express')
const router = express.Router()

const {
  createlivre,
  getlivres,
  getlivreById,
  updatelivre,
  deletelivre,
  borrowLivre,
  returnLivre,
  countLivres,
  countLivresById

} = require('../controllers/livreController')

// @route   POST api/livres
// @desc    Create a livre
// @access  Private
router.post('/', createlivre)

// @route   GET api/livres
// @desc    Get all livres
// @access  Public
router.get('/', getlivres)

// @route   GET api/livres/:id
// @desc    Get a livre by id
// @access  Public
router.get('/:id', getlivreById)

// @route   PUT api/livres/:id
// @desc    Update a livre
// @access  Private
router.put('/:id', updatelivre)

// @route   DELETE api/livres/:id
// @desc    Delete a livre
// @access  Private
router.delete('/:id', deletelivre)

// @route   PUT api/livres/borrow/:id
// @desc    Borrow a livre
// @access  Private
router.put('/borrow/:id', borrowLivre)

// @route   PUT api/livres/return/:id
// @desc    Return a livre
// @access  Private
router.put('/return/:id', returnLivre)

// @route   GET api/livres/count/:title
// @desc    Get the number of livres with a given title
// @access  Public
router.get('/count/:title', countLivres)

router.get('/countbyid/:id', countLivresById)

module.exports = router
