const { sequelize} = require('../models/Journal'); 
const Journal = require('../models/Journal')

const { Op } = require('sequelize');

exports.getStatCmdCancelOrNot = async (req, res) => {
  try {
    // Compter le nombre de commandes traitées (statut = 'traité')
    const nombreCommandesTraitées = await Journal.count({ where: { statut: 'traité' } });

    // Compter le nombre de commandes annulées (statut = 'annulé')
    const nombreCommandesAnnulées = await Journal.count({ where: { statut: 'annulé' } });

    // Retourner les résultats sous forme d'objet JSON
    res.status(200).json({ commandesTraitées: nombreCommandesTraitées, commandesAnnulées: nombreCommandesAnnulées });
  } catch (error) {
    console.error('Erreur lors de la récupération des statistiques de commandes dans journals :', error);
    res.status(500).json({ message: 'Erreur lors de la récupération des statistiques de commandes dans journals' });
  }
};


exports.getStatPlatinCmdThreat = async (req,res) => {


  try {

    const nombreCommandesParPersonne = await sequelize.query(`
    SELECT 
    REPLACE(SUBSTRING_INDEX(SUBSTRING_INDEX(j.description, '||', n), '-', 1), 'Nom du plat : ', '') AS nom_plat,
    COUNT(DISTINCT j.numCmd) AS nombre_de_ticketsCmd,
    GROUP_CONCAT(DISTINCT j.numCmd ORDER BY j.numCmd) AS ticketsCmd_associes
FROM 
    journals j
CROSS JOIN 
    (
        SELECT 1 AS n UNION ALL SELECT 2 UNION ALL SELECT 3 UNION ALL SELECT 4 UNION ALL SELECT 5
        -- Ajoutez plus de nombres si vous avez un maximum d'éléments dans descriptionPlat
    ) AS numbers
WHERE 
    j.statut = 'Traité'
    AND LENGTH(j.description) - LENGTH(REPLACE(j.description, '||', '')) >= n - 1
GROUP BY 
    nom_plat;
  `, { type: sequelize.QueryTypes.SELECT });
  

    res.status(200).json(nombreCommandesParPersonne)
  } catch (error) {
    console.error('Erreur lors de la récupération du nombre de commandes par personne :', error);
    throw error;
  }


}



exports.createJournal = async (req, res) => {
    try {
      var { numCmd,nomCommandeur,Description,Addition,Statut  } = req.body;
      
       
      console.log(numCmd,nomCommandeur,Description,Addition,Statut)
      
      const nouvelleJournal = await Journal.create({ numCmd,nomCommandeur,Description,Statut,Addition });
      
      
      res.status(201).json(nouvelleJournal);
    } catch (error) {
      console.error('Erreur lors de la création de la journal:', error);
      res.status(500).json({ message: 'Erreur lors de la création de la journal' });
    }
};
  

// Fonction pour récupérer toutes les journals ou filtrer par nomJournalur, plat, ou prixPlat
exports.getAlljournals = async (req, res) => {
  try {
      var journals;

      // Vérifiez s'il y a un paramètre de recherche
      if (req.query.search && req.query.search.trim() !== '') {
          // Utilisez le paramètre de recherche pour filtrer les journals
          journals = await Journal.findAll({
              where: {
                  [Op.or]: [
                      { nomJournalur: { [Op.like]: '%' + req.query.search + '%' } },
                      { numCmd: { [Op.like]: '%' + req.query.search + '%' } },
                      { nomPlat: { [Op.like]: '%' + req.query.search + '%' } },
                      { prixPlat: { [Op.like]: '%' + req.query.search + '%' } }
                  ]
              }
          });

          res.status(200).json(journals);
      } else {
          // Si aucun paramètre de recherche n'est fourni, récupérez toutes les journals
        

          journals = await sequelize.query(`
          SELECT numCmd as 'numéro du Commande',nomCommandeur as 'nom du Commandeur',Description as 'Contenu',Statut,Addition,DATE(updatedAt) as Date FROM journals;
          `, { type: sequelize.QueryTypes.SELECT });
          
          res.status(200).json(journals);
         
      }

      // Envoyez les journals récupérées en réponse
    
  } catch (error) {
      console.error('Erreur lors de la récupération des journals:', error);
      res.status(500).json({ message: 'Erreur lors de la récupération des journals' });
  }
};


exports.getNbCmdTraiter = async(req,res) => {
  var journals;

  journals = await sequelize.query(`
  SELECT COUNT(numCmd) AS nbCmdTraiter FROM journals;
  `, { type: sequelize.QueryTypes.SELECT });
  
  res.status(200).json(journals);
}


exports.getNombreCommandesParPersonne = async (req, res) => {
  try {

    const nombreCommandesParPersonne = await sequelize.query(`
    SELECT nomCommandeur, COUNT(numCmd) AS nombreCommandes
    FROM journals
    GROUP BY nomCommandeur;
  `, { type: sequelize.QueryTypes.SELECT });
  

    res.status(200).json(nombreCommandesParPersonne)
  } catch (error) {
    console.error('Erreur lors de la récupération du nombre de commandes par personne :', error);
    throw error;
  }
}
