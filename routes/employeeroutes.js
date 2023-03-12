const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const { check } = require('express-validator')
const {
  createEmployee,
  getEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee
} = require('../controllers/employeeController')

// @route   POST api/employees
// @desc    Create an employee
// @access  Private/Admin
router.post(
  '/',
  [
    auth,
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Please enter a password with 6 or more characters').isLength({
      min: 6
    }),
    check('role', 'Role is required').not().isEmpty()
  ],
  createEmployee
)

// @route   GET api/employees
// @desc    Get all employees
// @access  Private/Admin
router.get('/', auth, getEmployees)

// @route   GET api/employees/:id
// @desc    Get employee by ID
// @access  Private/Admin
router.get('/:id', auth, getEmployeeById)

// @route   PUT api/employees/:id
// @desc    Update an employee
// @access  Private/Admin
router.put(
  '/:id',
  [
    auth,
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Please enter a password with 6 or more characters').isLength({
      min: 6
    }),
    check('role', 'Role is required').not().isEmpty()
  ],
  updateEmployee
)

// @route   DELETE api/employees/:id
// @desc    Delete an employee
// @access  Private/Admin
router.delete('/:id', auth, deleteEmployee)

module.exports = router
