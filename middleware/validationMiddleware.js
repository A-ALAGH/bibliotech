const { validationResult } = require('express-validator');

// Middleware pour valider les entrées de l'utilisateur
const validateInputs = (req, res, next) => {
  // Vérifier les erreurs de validation
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  // Si tout est bon, passer à l'étape suivante
  next();
};

module.exports = {
  validateInputs,
};
