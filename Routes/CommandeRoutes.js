// routes/commandeRoutes.js

const express = require('express');
const router = express.Router();
const commandeController = require('../Controllers/CommandeController');
const Plat = require('../models/Plat')

// Créer une commande
router.post('/commandes', commandeController.createCommande);

// Obtenir toutes les commandes
router.get('/commandes', commandeController.getAllCommandes);

// Obtenir une commande par ID
router.get('/commandes/:id', commandeController.getCommandeById);

// Mettre à jour une commande
router.put('/commandes/:id', commandeController.updateCommande);



// Supprimer une commande
router.delete('/commandes/:id', commandeController.deleteCommande);

router.get('/typesPlats', async (req, res) => {
    try {
      const typesPlats = await Plat.findAll({
        attributes: ['type'],
        group: ['type']
      });
  
      const typesPlatsArray = typesPlats.map(plat => plat.type);
      console.log(typesPlatsArray)
      res.status(200).json(typesPlatsArray);
    } catch (error) {
      console.error('Erreur lors de la récupération des types de plats:', error);
      res.status(500).json({ message: 'Erreur lors de la récupération des types de plats' });
    }

  /*  console.log("Hello Word")*/

  });

  router.get('/plats/:type', async (req, res) => {
    const type = req.params.type;
    
    try {
      // Récupérer les plats en fonction du type spécifié
      const plats = await Plat.findAll({
        where: {
          type: type
        }
      });
  
      res.status(200).json(plats);
    } catch (error) {
      console.error('Erreur lors de la récupération des plats par type:', error);
      res.status(500).json({ message: 'Erreur lors de la récupération des plats par type' });
    }
  });

  

module.exports = router;
