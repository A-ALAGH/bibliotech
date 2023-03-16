const mongoose = require('mongoose')
const Schema = mongoose.Schema

const livreSchema = new Schema({
  titre: { type: String, required: true },
  auteur: { type: String, required: true },
  categorie: { type: Schema.Types.ObjectId, ref: 'Categorie', required: true },
  nombreExemplaires: { type: Number, required: true, min: 0 }
})

livreSchema.methods.getPretsEnCours = async function () {
  const borrowed = await Pret.find({ livre: this._id, dateRetour: { $exists: false } }).populate('user')
  return borrowed
}

const livre = mongoose.model('Livre', livreSchema)
const pretSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  livre: { type: Schema.Types.ObjectId, ref: 'Livre', required: true },
  dateEmprunt: { type: Date, required: true },
  dateRetour: { type: Date }
})

pretSchema.pre('save', function (next) {
  const maxReturnDate = new Date(this.dateEmprunt.getTime() + (30 * 24 * 60 * 60 * 1000))

  if (!this.dateRetour || this.dateRetour > maxReturnDate) {
    this.dateRetour = maxReturnDate
  }
  next()
})
pretSchema.methods.renouvelerPret = function () {
  const prolongement = 10 * 24 * 60 * 60 * 1000 // 10 jours en millisecondes
  this.dateRetour = new Date(this.dateRetour.getTime() + prolongement)
}
const Pret = mongoose.model('Pret', pretSchema)

module.exports = {
  livre, Pret
}
