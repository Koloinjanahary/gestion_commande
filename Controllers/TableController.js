// controllers/tableController.js

const Table = require('../models/Table');

// Créer une table
exports.createTable = async (req, res) => {
  try {
    const { nom, type, prix } = req.body;
    const nouvelleTable = await Table.create({ nom, type, prix });
    res.status(201).json(nouvelleTable);
  } catch (error) {
    console.error('Erreur lors de la création de la table:', error);
    res.status(500).json({ message: 'Erreur lors de la création de la table' });
  }
};

// Obtenir toutes les tables
exports.getAllTables = async (req, res) => {
  try {
    const tables = await Table.findAll();
    res.status(200).json(tables);
  } catch (error) {
    console.error('Erreur lors de la récupération des tables:', error);
    res.status(500).json({ message: 'Erreur lors de la récupération des tables' });
  }
};

// Obtenir une table par ID
exports.getTableById = async (req, res) => {
  const { id } = req.params;
  try {
    const table = await Table.findByPk(id);
    if (!table) {
      res.status(404).json({ message: 'Table non trouvée' });
    } else {
      res.status(200).json(table);
    }
  } catch (error) {
    console.error('Erreur lors de la récupération de la table:', error);
    res.status(500).json({ message: 'Erreur lors de la récupération de la table' });
  }
};

// Mettre à jour une table
exports.updateTable = async (req, res) => {
  const { id } = req.params;
  const { numero, capacite, emplacement } = req.body;
  try {
    const table = await Table.findByPk(id);
    if (!table) {
      res.status(404).json({ message: 'Table non trouvée' });
    } else {
      table.numero = numero;
      table.capacite = capacite;
      table.emplacement = emplacement;
      await table.save();
      res.status(200).json(table);
    }
  } catch (error) {
    console.error('Erreur lors de la mise à jour de la table:', error);
    res.status(500).json({ message: 'Erreur lors de la mise à jour de la table' });
  }
};

// Supprimer une table
exports.deleteTable = async (req, res) => {
  const { id } = req.params;
  try {
    const table = await Table.findByPk(id);
    if (!table) {
      res.status(404).json({ message: 'Table non trouvée' });
    } else {
      await table.destroy();
      res.status(204).end();
    }
  } catch (error) {
    console.error('Erreur lors de la suppression de la table:', error);
    res.status(500).json({ message: 'Erreur lors de la suppression de la table' });
  }
};
