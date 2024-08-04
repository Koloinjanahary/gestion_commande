// Créer une recette avec des plats
const Recette = require('../models/Recette')
const { Op } = require('sequelize');

exports.createRecette = async (req, res) => {
    try {
      var { numCmd,nomCommandeur , addition, bénéfice  } = req.body;
      
      const nouvelleRecette = await Recette.create({ numCmd,nomCommandeur,  addition, bénéfice });
      
      
      res.status(201).json(nouvelleRecette);
    } catch (error) {
      console.error('Erreur lors de la création de la commande:', error);
      res.status(500).json({ message: 'Erreur lors de la création de la commande' });
    }
};
  
  // Mettre à jour une commande avec des plats


// Fonction pour récupérer toutes les commandes ou filtrer par nomRecetteur, plat, ou prixPlat
exports.getAllRecettes = async (req, res) => {
  try {
      let commandes;

      // Vérifiez s'il y a un paramètre de recherche
      if (req.query.search && req.query.search.trim() !== '') {
          // Utilisez le paramètre de recherche pour filtrer les commandes
          commandes = await Recette.findAll({
              where: {
                  [Op.or]: [
                      { nomRecetteur: { [Op.like]: '%' + req.query.search + '%' } },
                      { numCmd: { [Op.like]: '%' + req.query.search + '%' } },
                      { nomPlat: { [Op.like]: '%' + req.query.search + '%' } },
                      { prixPlat: { [Op.like]: '%' + req.query.search + '%' } }
                  ]
              }
          });
      } else {
          // Si aucun paramètre de recherche n'est fourni, récupérez toutes les commandes
          commandes = await Recette.findAll();
      }

      // Envoyez les commandes récupérées en réponse
      res.status(200).json(commandes);
  } catch (error) {
      console.error('Erreur lors de la récupération des commandes:', error);
      res.status(500).json({ message: 'Erreur lors de la récupération des commandes' });
  }
};
  
  // Obtenir une commande par ID
  exports.getRecetteById = async (req, res) => {
    const { date } = req.params;
    try {
      const dateX = new Date(date); // Convertir la chaîne en objet Date
  
      // Utilisez Sequelize pour effectuer une requête groupée et une agrégation
      Recette.findAll({
        attributes: [[sequelize.fn('SUM', sequelize.col('bénéfice')), 'total_bénéfice']],
        where: sequelize.where(sequelize.fn('DATE', sequelize.col('date')), dateX)
      })
      .then(result => {
        // result contient la somme des bénéfices à la date spécifique
        const totalBénéfice = result[0].dataValues.total_bénéfice;
        console.log('Somme des bénéfices à la date', date, ':', totalBénéfice);
        res.status(200).json({ total: totalBénéfice });
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des données:', error);
        res.status(500).json({ message: 'Erreur lors de la récupération des données' });
      });
      
    } catch (error) {
      console.error('Erreur lors de la récupération de la recette:', error);
      res.status(500).json({ message: 'Erreur lors de la récupération de la recette' });
    }
  };
  
  
// Supprimer une commande
