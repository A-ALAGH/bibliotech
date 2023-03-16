// database.js

const mongoose = require('mongoose')
const { DB_URI } = require('./config')

const connectDB = async () => {
  try {
    await mongoose.connect(DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false
    })
    console.log('MongoDB connected')
  } catch (error) {
    console.error(error.message)
    process.exit(1)
  }
}

module.exports = {
  connectDB,
  mongoose
}
