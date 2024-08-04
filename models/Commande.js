const { DataTypes } = require('sequelize');
const sequelize = require('../config/config');

const Commande = sequelize.define('Commande', {
    idCommande: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    ticketCmd: {
        type: DataTypes.STRING(50),
        primaryKey: true
    },
    nomPlat: {
        type: DataTypes.STRING(50),
        primaryKey: true
    },
    typePlat: {
        type: DataTypes.STRING(50),
        primaryKey: true
    },
    prixPlat: {
        type: DataTypes.INTEGER,
       
        
    },
    quantite: {
        type: DataTypes.INTEGER,

    },
    nomCommandeur: {
        type: DataTypes.STRING(50),
        allowNull: false,
       
    },
    typeCommande: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
   
    LieuLivraison: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    prixTotal: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
     platSelectionne: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: false
    }
});

module.exports = Commande;
