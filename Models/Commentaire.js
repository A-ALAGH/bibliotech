const mongoose = require('mongoose')

const commentaireSchema = new mongoose.Schema({
  livre: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Livre',
    required: true
  },
  auteur: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  texte: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  reponses: [{
    auteur: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    texte: {
      type: String,
      required: true
    },
    date: {
      type: Date,
      default: Date.now
    }
  }]
})

module.exports = mongoose.model('Commentaire', commentaireSchema)
