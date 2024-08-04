// Créer une commande avec des plats
const Commande = require('../models/Commande')
const { Op } = require('sequelize');

exports.createCommande = async (req, res) => {
    try {
      var { ticketCmd,typePlat,nomCommandeur,quantite, typeCommande, LieuLivraison, nomPlat, prixPlat, prixTotal,platSelectionne } = req.body;
      
     
      console.log(req.body)

    console.log(ticketCmd,typePlat,quantite,typeCommande,LieuLivraison,nomPlat,prixPlat,prixTotal,nomCommandeur)
      const nouvelleCommande = await Commande.create({ ticketCmd,nomPlat,typePlat, prixPlat,quantite, nomCommandeur, typeCommande, LieuLivraison, prixTotal,platSelectionne });
      
      
      res.status(201).json(nouvelleCommande);
    } catch (error) {
      console.error('Erreur lors de la création de la commande:', error);
      res.status(500).json({ message: 'Erreur lors de la création de la commande' });
    }
};
  
  // Mettre à jour une commande avec des plats
exports.updateCommande = async (req, res) => {
 
  const { id } = req.params;
  const { numCmd,typePlat,nomCommandeur,qtePlat, typeCommande, lieuLivraison, nomPlat, prixPlat, prixTotal  } = req.body;
  try {
  
    if(id){
      var commandes = await Commande.findAll({
        where: {
         [Op.or]: [
            { idCommande: id }, // Filtrer par le champ idCmd
             {numCmd: id}  // Filtrer par le champ numCmd
          ]
        }
      });
      
      if (commandes.length === 0) {
        res.status(404).json({ message: 'Aucune commande à modifer trouvée' });
      } else {
        // Supprimer chaque commande trouvée
        for (let i = 0; i < commandes.length; i++) {
          await commandes[i].destroy();
        }

        
      }
        
      }

  } catch (error) {
    console.error('Erreur lors de la mise à jour de la commande:', error);
    res.status(500).json({ message: 'Erreur lors de la mise à jour de la commande' });
  }
  
};



// Fonction pour récupérer toutes les commandes ou filtrer par nomCommandeur, plat, ou prixPlat
exports.getAllCommandes = async (req, res) => {
  try {
      let commandes;

      // Vérifiez s'il y a un paramètre de recherche
     
          // Si aucun paramètre de recherche n'est fourni, récupérez toutes les commandes
          commandes = await Commande.findAll();
      

      // Envoyez les commandes récupérées en réponse
      res.status(200).json(commandes);
  } catch (error) {
      console.error('Erreur lors de la récupération des commandes:', error);
      res.status(500).json({ message: 'Erreur lors de la récupération des commandes' });
  }
};
  
  // Obtenir une commande par ID
  exports.getCommandeById = async (req, res) => {
    const { id } = req.params;
    try {
      let commandes = await Commande.findAll({
          where: {
              [Op.or]: [
                  { nomCommandeur: { [Op.like]: '%' + id + '%' } },
                  { ticketCmd: { [Op.like]: '%' + id + '%' } },
                  { nomPlat: { [Op.like]: '%' + id + '%' } },
                  { prixPlat: { [Op.like]: '%' +id + '%' } }
              ]
          }
      });
      if (!commandes) {
        res.status(404).json({ message: 'Commande non trouvée' });
      } else {

          res.status(200).json(commandes);
        
      
      }
    } catch (error) {
      console.error('Erreur lors de la récupération de la commande:', error);
      res.status(500).json({ message: 'Erreur lors de la récupération de la commande' });
    }
  };


  
// Supprimer une commande
exports.deleteCommande = async (req, res) => {
  const { id } = req.params;
  

  try {
    console.log(id)
    if(id){
      var commandes = await Commande.findAll({
        where: {
          [Op.or]: [
              { ticketCmd: { [Op.like]: '%' + id + '%' } },
              { idCommande: { [Op.like]: '%' + id + '%' } }
          ]
      }
      });
      
      if (commandes.length === 0) {
        res.status(404).json({ message: 'Aucune commande trouvée' });
      } else {
        // Supprimer chaque commande trouvée
        for (let i = 0; i < commandes.length; i++) {
          await commandes[i].destroy();
        }
        res.status(204).end();
      }
        
      }

      
  } catch (error) {
    console.error('Erreur lors de la suppression de la commande:', error);
    res.status(500).json({ message: 'Erreur lors de la suppression de la commande' });
  }
};
