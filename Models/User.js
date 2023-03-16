const mongoose = require('mongoose')
const Schema = mongoose.Schema
const { Pret } = require('../Models/livre')

const UserSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, required: true, enum: ['employee', 'client'], default: 'client' },
  prets: [{ type: Schema.Types.ObjectId, ref: 'Pret' }]
})

UserSchema.methods.getHistoriquePrets = async function () {
  const prets = await Pret.find({ user: this._id }).populate('livre')
  return prets
}

const User = mongoose.model('User', UserSchema)

module.exports =
  User
