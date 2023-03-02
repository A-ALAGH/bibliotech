const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const livreSchema = new Schema({
  titre: { type: String, required: true },
  auteur: { type: String, required: true },
  categorie: { type: Schema.Types.ObjectId, ref: 'Categorie', required: true },
  nombreExemplaires: { type: Number, required: true, min: 0 }
});

const livre = mongoose.model('Livre', livreSchema);

module.exports = {
  livre
};
