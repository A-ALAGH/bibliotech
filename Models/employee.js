const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const employeeSchema = new Schema({
  nom: { type: String, required: true },
  prenom: { type: String, required: true },
  adresse: { type: String },
  telephone: { type: String },
  email: { type: String },
  dateEmbauche: { type: Date, required: true },
  poste: { type: String, required: true }
});


const employee = mongoose.model('employee', employeeSchema);

module.exports = {
  employee
};
