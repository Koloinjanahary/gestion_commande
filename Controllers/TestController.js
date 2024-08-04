// controllers/testController.js

const Test = require('../models/Test');



// Obtenir toutes les tests
exports.getAllTests = async (req, res) => {
    
  try {
    const tests = await Test.findAll();
    res.status(200).json(tests);
  } catch (error) {
    console.error('Erreur lors de la récupération des tests:', error);
    res.status(500).json({ message: 'Erreur lors de la récupération des tests' });
  }
};

// Obtenir une test par ID
exports.getTestById = async (req, res) => {
  const { id } = req.params;
  try {
    const test = await Test.findAll({where : {idCmd: id} });
    if (!test) {
      res.status(404).json({ message: 'Test non trouvée' });
    } else {
      res.status(200).json(test);
    }
  } catch (error) {
    console.error('Erreur lors de la récupération de la test:', error);
    res.status(500).json({ message: 'Erreur lors de la récupération de la test' });
  }
};

