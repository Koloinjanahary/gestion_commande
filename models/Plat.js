const { DataTypes } = require('sequelize');
const sequelize = require('../config/config');

const Plat = sequelize.define('Plat', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
  nomPlat: {
    type: DataTypes.STRING(50),
   
  },
  typePlat: {
    type: DataTypes.STRING(50),
    
   
  },
  prixPlat  : {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  platSelectionne  : {
    type: DataTypes.BOOLEAN,
    allowNull: false
  },
  quantite  : {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  
});

module.exports = Plat;
