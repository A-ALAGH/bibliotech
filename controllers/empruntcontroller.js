const Utilisateur = require('../models/Utilisateur');
const Livre = require('../models/Livre');

async function emprunterLivre(utilisateurId, livreId) {
  const utilisateur = await Utilisateur.findById(utilisateurId);
  const livre = await Livre.findById(livreId);

  if (!utilisateur || !livre) {
    throw new Error('Utilisateur ou livre introuvable');
  }

  const emprunts = utilisateur.emprunts.filter(
    (emprunt) => emprunt.date > Date.now() - 30 * 24 * 60 * 60 * 1000
  );

  if (emprunts.length >= 3) {
    throw new Error("L'utilisateur a déjà emprunté 3 livres ce mois-ci");
  }

  if (livre.copies === 0) {
    throw new Error('Le livre est indisponible');
  }

  utilisateur.emprunts.push({ livre: livreId, date: new Date() });
  livre.copies--;
  await utilisateur.save();
  await livre.save();
}

module.exports = {
  emprunterLivre,
};
