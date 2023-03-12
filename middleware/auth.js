const jwt = require('jsonwebtoken')

const auth = (req, res, next) => {
  const token = req.header('Authorization')
  if (!token) return res.status(401).json({ msg: 'No token, authorization denied' })

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = decoded.user
    next()
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' })
  }
}
const rolemiddle = (req, res, next) => {
  if (req.isAuthenticated() && req.user.role === 'employee') {
    return next()
  }
  res.status(401).json({ success: false, message: 'Unauthorized' })
}

// eslint-disable-next-line no-unused-expressions
module.exports = { auth, rolemiddle }
