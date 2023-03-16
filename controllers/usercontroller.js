const User = require('../models/User')
const { validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')

// Get all users
const getUsers = async (req, res) => {
  try {
    const users = await User.find()
    res.status(200).json({ success: true, data: users })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

// Get user by ID
const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' })
    }
    res.status(200).json({ success: true, data: user })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

// Create a new user
const createUser = async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  try {
    const user = new User(req.body)
    const newUser = await user.save()
    res.status(201).json({ success: true, data: newUser })
  } catch (error) {
    res.status(400).json({ success: false, message: error.message })
  }
}

// Update a user
const updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true })
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' })
    }
    res.status(200).json({ success: true, data: user })
  } catch (error) {
    res.status(400).json({ success: false, message: error.message })
  }
}

// Delete a user
const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id)
    if (!user) {
      return res.status(404).json({
        msg: 'Utilisateur introuvable'
      })
    }
    return res.status(200).json({
      msg: 'Utilisateur supprimé avec succès'
    })
  } catch (err) {
    return res.status(500).json({
      msg: 'Quelque chose a mal tourné'
    })
  }
}
// Login function
const login = async (req, res) => {
  // Check for input errors
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  // Get user credentials from request body
  const { email, password } = req.body

  try {
    // Find user by email in database
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' })
    }

    // Compare password with hashed password in database
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid password' })
    }

    // Create session for authenticated user
    req.session.user = user

    // Send response with user information
    res.status(200).json({ success: true, data: user })
  } catch (error) {
    // Handle any errors
    res.status(500).json({ success: false, message: error.message })
  }
}

// Export login function

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  login
}
