const express = require('express');
const router = express.Router();
const JournalController = require('../Controllers/JournalController');

router.post('/journals', JournalController.createJournal);
router.get('/journals', JournalController.getAlljournals);

// Correction de la route '/journals/StatCmd'
router.get('/journals/statCmd', JournalController.getStatCmdCancelOrNot); // Assurez-vous que cette ligne est correctement définie
router.get('/journals/NbCmdPerPerson', JournalController.getNombreCommandesParPersonne);
router.get('/journals/StatPlatCmd', JournalController.getStatPlatinCmdThreat);
router.get('/jounals/NbCmdTraiter' , JournalController.getNbCmdTraiter);
module.exports = router;
