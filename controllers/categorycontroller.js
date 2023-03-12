const Category = require('../models/category')

// Afficher toutes les catégories
exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.find()
    res.status(200).json(categories)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// Afficher une catégorie en particulier
exports.getCategoryById = async (req, res) => {
  const id = req.params.id
  try {
    const category = await Category.findById(id)
    if (!category) {
      return res.status(404).json({ message: 'Category not found' })
    }
    res.status(200).json(category)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// Ajouter une nouvelle catégorie
exports.createCategory = async (req, res) => {
  const category = new Category({
    name: req.body.name,
    description: req.body.description
  })
  try {
    const newCategory = await category.save()
    res.status(201).json(newCategory)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
}

// Mettre à jour une catégorie
exports.updateCategory = async (req, res) => {
  const id = req.params.id
  try {
    const category = await Category.findById(id)
    if (!category) {
      return res.status(404).json({ message: 'Category not found' })
    }
    category.name = req.body.name || category.name
    category.description = req.body.description || category.description
    const updatedCategory = await category.save()
    res.status(200).json(updatedCategory)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// Supprimer une catégorie
exports.deleteCategory = async (req, res) => {
  const id = req.params.id
  try {
    const category = await Category.findById(id)
    if (!category) {
      return res.status(404).json({ message: 'Category not found' })
    }
    await category.remove()
    res.status(200).json({ message: 'Category deleted successfully' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}
