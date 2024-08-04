const express = require('express');
const router = express.Router();
const recetteController = require('../Controllers/RecetteController');
const commandeController = require('../Controllers/CommandeController');


router.post('/recettes', recetteController.createRecette);

// Obtenir toutes les Recettes
router.get('/recettes', recetteController.getAllRecettes);

// Obtenir une Recette par ID
router.get('/recette/:date', recetteController.getRecetteById);

module.exports = router;