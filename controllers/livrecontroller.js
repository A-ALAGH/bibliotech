const { livre } = require('../models/livre')
const rolemiddle = require('../middleware/auth')
const router = require('express').Router()
const getUserById = require('../controllers/userController')

// Afficher tous les livres
const getlivres = async (req, res) => {
  try {
    const livres = await livre.find().populate('categorie', 'nom')
    res.status(200).json({ success: true, data: livres })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

// Afficher un livre par son ID
const getlivreById = async (req, res) => {
  try {
    const livres = await livre.findById(req.params.id).populate('categorie', 'nom')
    if (!livres) {
      return res.status(404).json({ success: false, message: 'Livre introuvable' })
    }
    res.status(200).json({ success: true, data: livres })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

// Ajouter un nouveau livre
const createlivre = async (req, res) => {
  try {
    router.post('/livres', rolemiddle('admin'), createlivre)
    const livres = new Livre(req.body)
    const newLivre = await livres.save()
    res.status(201).json({ success: true, data: newLivre })
  } catch (error) {
    res.status(400).json({ success: false, message: error.message })
  }
}

// Mettre à jour un livre
const updatelivre = async (req, res) => {
  try {
    router.put('/livres/:id', rolemiddle('admin'), updatelivre)
    const livres = await livre.findByIdAndUpdate(req.params.id, req.body, { new: true })
    if (!livres) {
      return res.status(404).json({ success: false, message: 'Livre introuvable' })
    }
    res.status(200).json({ success: true, data: livres })
  } catch (error) {
    res.status(400).json({ success: false, message: error.message })
  }
}

// Supprimer un livre
const deletelivre = async (req, res) => {
  try {
    router.delete('/livres/:id', rolemiddle('admin'), deletelivre)
    const livres = await livre.findByIdAndDelete(req.params.id)
    if (!livres) {
      return res.status(404).json({ success: false, message: 'Livre introuvable' })
    }
    res.status(200).json({ success: true, data: {} })
  } catch (error) {
    res.status(400).json({ success: false, message: error.message })
  }
}
// emrpunt
async function borrowLivre (userId, livreId) {
  const user = await getUserById(userId)
  const livres = await livre.findById(livreId)

  if (!user || !livres) {
    throw new Error('Utilisateur ou livre introuvable')
  }

  const emprunts = user.emprunts.filter(
    (emprunt) => emprunt.date > Date.now() - 30 * 24 * 60 * 60 * 1000
  )

  if (emprunts.length >= 3) {
    throw new Error("L'utilisateur a déjà emprunté 3 livres ce mois-ci")
  }

  if (livres.copies === 0) {
    throw new Error('Le livre est indisponible')
  }

  user.emprunts.push({ livre: livreId, date: new Date() })
  livres.copies--
  await user.save()
  await livres.save()
}
// retour
const returnLivre = async (req, res) => {
  try {
    const livres = await livre.findById(req.params.id)
    if (!livres) {
      return res.status(404).json({ success: false, message: 'Livre introuvable' })
    }
    if (!livres.emprunteur) {
      return res.status(400).json({ success: false, message: "Le livre n'est pas emprunté" })
    }
    livres.emprunteur = null
    livres.empruntDate = null
    await livres.save()
    res.status(200).json({ success: true, data: livres })
  } catch (error) {
    res.status(400).json({ success: false, message: error.message })
  }
}

// Compter tous les livres
const countLivres = async (req, res) => {
  try {
    const count = await livre.countDocuments()
    res.status(200).json({ success: true, data: count })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

// Compter les livres avec un ID spécifique
const countLivresById = async (req, res) => {
  try {
    const count = await livre.countDocuments({ _id: req.params.id })
    res.status(200).json({ success: true, data: count })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

module.exports = { getlivres, getlivreById, createlivre, updatelivre, deletelivre, borrowLivre, returnLivre, countLivres, countLivresById }
