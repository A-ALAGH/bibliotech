const Livre = require('../models/livre');

// Afficher tous les livres
const getAllLivres = async (req, res) => {
  try {
    const livres = await Livre.find().populate('categorie', 'nom');
    res.status(200).json({ success: true, data: livres });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Afficher un livre par son ID
const getLivreById = async (req, res) => {
  try {
    const livre = await Livre.findById(req.params.id).populate('categorie', 'nom');
    if (!livre) {
      return res.status(404).json({ success: false, message: "Livre introuvable" });
    }
    res.status(200).json({ success: true, data: livre });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Ajouter un nouveau livre
const addLivre = async (req, res) => {
  try {
    const livre = new Livre(req.body);
    const newLivre = await livre.save();
    res.status(201).json({ success: true, data: newLivre });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Mettre à jour un livre
const updateLivre = async (req, res) => {
  try {
    const livre = await Livre.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!livre) {
      return res.status(404).json({ success: false, message: "Livre introuvable" });
    }
    res.status(200).json({ success: true, data: livre });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Supprimer un livre
const deleteLivre = async (req, res) => {
  try {
    const livre = await Livre.findByIdAndDelete(req.params.id);
    if (!livre) {
      return res.status(404).json({ success: false, message: "Livre introuvable" });
    }
    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

module.exports = { getAllLivres, getLivreById, addLivre, updateLivre, deleteLivre };

