const User = require('../Models/User')

exports.getHistoriquePrets = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId)
    if (!user) {
      return res.status(404).json({ msg: 'User not found' })
    }
    const prets = await user.getHistoriquePrets()
    res.json(prets)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
}
