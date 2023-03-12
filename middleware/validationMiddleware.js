const { body, validationResult } = require('express-validator')
const express = require('express')
const router = express.router()
const auth = require('auth.js')

const schemas = {
  authSignupSchema: [
    body('email').isEmail().withMessage('Invalid email address'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
    body('role').isIn(['bibliothequaire', 'client']).withMessage('Invalid role')
  ],
  authLoginSchema: [
    body('email').isEmail().withMessage('Invalid email address'),
    body('password').notEmpty().withMessage('Password is required')
  ]
}

const validateBody = (schema) => {
  return async (req, res, next) => {
    await Promise.all(schema.map((field) => field.run(req)))
    const errors = validationResult(req)
    if (errors.isEmpty()) {
      return next()
    }
    const extractedErrors = errors.array().map((error) => ({ [error.param]: error.msg }))
    return res.status(422).json({
      errors: extractedErrors
    })
  }
}

module.exports = {
  schemas,
  validateBody
}
const { check } = require('express-validator')
const { updateUserProfile } = require('../controllers/userController')

router.put(
  '/:id',
  auth,
  [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please enter a valid email').isEmail(),
    check('password', 'Please enter a password with 6 or more characters').isLength({
      min: 6
    })
  ],
  updateUserProfile
)
