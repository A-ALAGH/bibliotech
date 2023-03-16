const express = require('express')
const mongoose = require('mongoose')
const app = express()

// Middleware
app.use(express.json())
// débuggage authentification
app.post('/api/users', (req, res) => {
  const user = req.body
  console.log(user)
  res.status(201).send('User created')
})

// Connexion à la base de données MongoDB
mongoose.connect('mongodb+srv://Abbas:abbas@bibliotech.wr1y9ku.mongodb.net/mydatabase?retryWrites=true&w=majority', {
  // useNewUrlParser: true,
  // useUnifiedTopology: true,
  // useCreateIndex: true,
  // useFindAndModify: false,
}).then(() => console.log('MongoDB Connected'))

// Import des routes
const authRoutes = require('./routes/authRoutes')
const userRoutes = require('./routes/userRoutes')
const employeeRoutes = require('./routes/employeeRoutes')
const categoryRoutes = require('./routes/categoryRoutes')
const livreRoutes = require('./routes/livreRoutes')
const commentaireRoutes = require('./routes/commentaireRoutes')
// Routes
app.use(express.json())
app.use('/api/auth', authRoutes)
app.use('/api/users', userRoutes)
app.use('/api/employees', employeeRoutes)
app.use('/api/categories', categoryRoutes)
app.use('/api/livres', livreRoutes)
app.use('/commentaires', commentaireRoutes)
app.use('/api', userRoutes)

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Server started on port ${port}`))
