const express = require('express')
const router = express.Router()
const Pret = require('../Models/Pret')
const User = require('../Models/User')
const { Livre } = require('../models/livre')
const { getHistoriquePrets } = require('../controllers/pretscontrollers')

router.get('/users/:userId/historique-prets', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId)
    const prets = await user.getHistoriquePrets()
    res.json(prets)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
})
router.get('/livres/:livreId/prets-en-cours', async (req, res) => {
  try {
    const livres = await Livre.findById(req.params.livreId)
    const prets = await livres.getPretsEnCours()
    res.json(prets)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
})
router.post('/prets', async (req, res) => {
  try {
    const { userId, livreId } = req.body
    const user = await User.findById(userId)
    const livres = await Livre.findById(livreId)
    if (!user || !livres) {
      return res.status(400).json({ msg: 'Invalid User or Livre ID' })
    }

    if (livres.nombreExemplaires <= 0) {
      return res.status(400).json({ msg: 'No more exemplaires available' })
    }

    const pret = new Pret({
      user: user._id,
      livre: Livre._id,
      dateEmprunt: new Date()
    })

    Livre.nombreExemplaires--
    await Livre.save()

    await pret.save()

    res.json(pret)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
})

router.get('/users/:userId/historique-prets', getHistoriquePrets)

module.exports = router
