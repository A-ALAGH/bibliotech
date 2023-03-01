const express = require('express');
const router = express.Router();
const EmpruntController = require('../controllers/empruntController');

// Route pour emprunter un livre
router.post('/:userId/livres/:livreId', EmpruntController.emprunterLivre);

module.exports = router;
