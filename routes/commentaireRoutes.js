const express = require('express')
const router = express.Router()
// const auth = require('../middleware/auth')
const commentaireController = require('../controllers/commentaireController')

router.post('/', commentaireController.ajouterCommentaire)
router.post('/reponses', commentaireController.ajouterReponse)

module.exports = router
