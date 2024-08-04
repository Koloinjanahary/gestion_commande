// controllers/platController.js

const Plat = require('../models/Plat');
const { Op } = require('sequelize');

// Créer un plat
exports.createPlat = async (req, res) => {
  try {

    const platSelectionne = false;
    const quantite = 0;
    const { nomPlat, typePlat, prixPlat } = req.body;
    const nouveauPlat = await Plat.create({ nomPlat, typePlat, prixPlat , platSelectionne, quantite   });
    res.status(201).json(nouveauPlat);
  } catch (error) {
    console.error('Erreur lors de la création du plat:', error);
    res.status(500).json({ message: 'Erreur lors de la création du plat' });
  }
};

// Obtenir tous les plats
exports.getAllPlats = async (req, res) => {
  try {
    let plats = await Plat.findAll();
    res.status(200).json(plats);
  } catch (error) {
    console.error('Erreur lors de la récupération des plats:', error);
    res.status(500).json({ message: 'Erreur lors de la récupération des plats' });
  }
};



/*exports.getPlatById = async  (req, res) => {
  const { id } = req.params;

  console.log("Valeur de id :", id); // Assurez-vous de recevoir les données côté backend

  // Création d'une expression régulière pour rechercher une correspondance partielle avec le nom ou le type
  const regex = new RegExp(id, 'i');

  let plats = await Plat.findAll();

  const results = plats.filter(plat => {
    return regex.test(plat.nom) || regex.test(plat.type);
  });

  console.log(results);

  if (results.length === 0) {
    res.status(404).json({ message: 'Plat non trouvé' });
  } else {
    res.status(200).json(results);
  }
};*/
  
  




// Mettre à jour un plat
exports.updatePlat = async (req, res) => {
  const { id } = req.params;
  const { nom, type, prix } = req.body;
  try {
    const plat = await Plat.findByPk(id);
    if (!plat) {
      res.status(404).json({ message: 'Plat non trouvé' });
    } else {
      plat.nom = nom;
      plat.type = type;
      plat.prix = prix;
      await plat.save();
      res.status(200).json(plat);
    }
  } catch (error) {
    console.error('Erreur lors de la mise à jour du plat:', error);
    res.status(500).json({ message: 'Erreur lors de la mise à jour du plat' });
  }
};

// Supprimer un plat
exports.deletePlat = async (req, res) => {
  const { id } = req.params;
  try {
    const plat = await Plat.findByPk(id);
    if (!plat) {
      res.status(404).json({ message: 'Plat non trouvé' });
    } else {
      await plat.destroy();
      res.status(204).end();
    }
  } catch (error) {
    console.error('Erreur lors de la suppression du plat:', error);
    res.status(500).json({ message: 'Erreur lors de la suppression du plat' });
  }
};
