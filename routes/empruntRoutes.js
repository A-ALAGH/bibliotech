const express = require('express')
const router = express.Router()
const EmpruntController = require('../controllers/livreController')

// Route pour emprunter un livre
router.post('/:userId/livres/:livreId', EmpruntController.borrowLivre)

module.exports = router
