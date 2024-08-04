// routes/testRoutes.js

const express = require('express');
const router = express.Router();
const testController = require('../Controllers/TestController');

// Créer une test


// Obtenir toutes les tests
router.get('/tests', testController.getAllTests);

// Obtenir une test par ID
router.get('/tests/:id', testController.getTestById);

// Mettre à jour une test
/*router.put('/tests/:id', testController.updatetest);

// Supprimer une test
router.delete('/tests/:id', testController.deletetest);*/

module.exports = router;
