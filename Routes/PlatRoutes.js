// routes/platRoutes.js

const express = require('express');
const router = express.Router();
const platController = require('../Controllers/PlatController');

// Créer un plat
router.post('/plats', platController.createPlat);

// Obtenir tous les plats
router.get('/plats', platController.getAllPlats);

// Obtenir un plat par ID
//router.get('/plats/:id', platController.getPlatById);

// Mettre à jour un plat
router.put('/plats/:id', platController.updatePlat);

// Supprimer un plat
router.delete('/plats/:id', platController.deletePlat);

module.exports = router;
