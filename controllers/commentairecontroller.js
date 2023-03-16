const Commentaire = require('../models/commentaire')

exports.ajouterCommentaire = async (req, res) => {
  const { livre, texte } = req.body
  const auteur = req.user.id // récupérer l'auteur du token JWT

  try {
    const commentaire = new Commentaire({
      livre,
      auteur,
      texte
    })

    await commentaire.save()
    res.status(201).json(commentaire)
  } catch (err) {
    console.error(err)
    res.status(500).send('Erreur serveur')
  }
}

exports.ajouterReponse = async (req, res) => {
  const { commentaireId, texte } = req.body
  const auteur = req.user.id // récupérer l'auteur du token JWT

  try {
    const commentaire = await Commentaire.findById(commentaireId)

    if (!commentaire) {
      return res.status(404).json({ msg: 'Commentaire non trouvé' })
    }

    const nouvelleReponse = {
      auteur,
      texte
    }

    commentaire.reponses.unshift(nouvelleReponse)
    await commentaire.save()
    res.status(201).json(commentaire)
  } catch (err) {
    console.error(err)
    res.status(500).send('Erreur serveur')
  }
}
