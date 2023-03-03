const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Utilisateur = require('../models/User');

// Fonction d'inscription
exports.inscription = async (req, res) => {
    try {
      const { nom, prenom, email, password } = req.body;
  
      // Vérifier si l'utilisateur existe déjà dans la base de données
      const utilisateurExistant = await Utilisateur.findOne({ email });
      if (utilisateurExistant) {
        return res.status(400).json({ message: 'Cet email est déjà utilisé' });
      }
  
      // Créer un nouvel utilisateur
      const utilisateur = new Utilisateur({email, password });
  
      // Hasher le mot de passe avant de l'enregistrer dans la base de données
      const salt = await bcrypt.genSalt(10);
      utilisateur.password = await bcrypt.hash(password, salt);
  
      await utilisateur.save();
  
      // Créer et envoyer un token JWT à l'utilisateur
      const payload = { utilisateur: { id: utilisateur.id } };
      const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.json({ token });
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Erreur serveur');
    }
  };
  

// Fonction de connexion
exports.connexion = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Vérifier si l'utilisateur existe dans la base de données
    const utilisateur = await Utilisateur.findOne({ email });
    if (!utilisateur) {
      return res.status(400).json({ message: 'Email ou mot de passe incorrect' });
    }

    // Vérifier si le mot de passe est correct
    const motDePasseValide = await bcrypt.compare(password, utilisateur.password);
    if (!motDePasseValide) {
      return res.status(400).json({ message: 'Email ou mot de passe incorrect' });
    }

    // Créer et envoyer un token JWT à l'utilisateur
    const payload = { utilisateur: { id: utilisateur.id } };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Erreur serveur');
  }
};
