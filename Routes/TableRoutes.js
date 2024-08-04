// routes/tableRoutes.js

const express = require('express');
const router = express.Router();
const tableController = require('../Controllers/TableController');

// Créer une table
router.post('/tables', tableController.createTable);

// Obtenir toutes les tables
router.get('/tables', tableController.getAllTables);

// Obtenir une table par ID
router.get('/tables/:id', tableController.getTableById);

// Mettre à jour une table
router.put('/tables/:id', tableController.updateTable);

// Supprimer une table
router.delete('/tables/:id', tableController.deleteTable);

module.exports = router;
