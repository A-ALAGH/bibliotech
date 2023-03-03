const Livre = require('../models/livre');
const rolemiddle=require('../middleware/auth')

// Afficher tous les livres
const getlivres = async (req, res) => {
  try {
    const livres = await Livre.find().populate('categorie', 'nom');
    res.status(200).json({ success: true, data: livres });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Afficher un livre par son ID
const getlivreById = async (req, res) => {
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
const createlivre = async (req, res) => {
  try {
    const livre = new Livre(req.body);
    const newLivre = await livre.save();
    res.status(201).json({ success: true, data: newLivre });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Mettre à jour un livre
const updatelivre = async (req, res) => {
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
const deletelivre = async (req, res) => {
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
//emrpunt
async function borrowLivre(userId, livreId) {
  const user = await User.findById(userId);
  const livre = await Livre.findById(livreId);

  if (!user || !livre) {
    throw new Error('Utilisateur ou livre introuvable');
  }

  const emprunts = user.emprunts.filter(
    (emprunt) => emprunt.date > Date.now() - 30 * 24 * 60 * 60 * 1000
  );

  if (emprunts.length >= 3) {
    throw new Error("L'utilisateur a déjà emprunté 3 livres ce mois-ci");
  }

  if (livre.copies === 0) {
    throw new Error('Le livre est indisponible');
  }

  user.emprunts.push({ livre: livreId, date: new Date() });
  livre.copies--;
  await user.save();
  await livre.save();
}
//retour
const returnLivre = async (req, res) => {
  try {
    const livre = await Livre.findById(req.params.id);
    if (!livre) {
      return res.status(404).json({ success: false, message: "Livre introuvable" });
    }
    if (!livre.emprunteur) {
      return res.status(400).json({ success: false, message: "Le livre n'est pas emprunté" });
    }
    livre.emprunteur = null;
    livre.empruntDate = null;
    await livre.save();
    res.status(200).json({ success: true, data: livre });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Compter tous les livres
const countLivres = async (req, res) => {
  try {
    const count = await Livre.countDocuments();
    res.status(200).json({ success: true, data: count });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Compter les livres avec un ID spécifique
const countLivresById = async (req, res) => {
  try {
    const count = await Livre.countDocuments({ _id: req.params.id });
    res.status(200).json({ success: true, data: count });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { getlivres, getlivreById, createlivre: rolemiddle, updatelivre: rolemiddle, deletelivre :rolemiddle, borrowLivre, returnLivre, countLivres, countLivresById };


