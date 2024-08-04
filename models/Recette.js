const { DataTypes } = require('sequelize');
const sequelize = require('../config/config');

const Recette = sequelize.define('Recette', {
    numCmd: {
        type: DataTypes.STRING(50),
        primaryKey: true,
        allowNull: false
      },
    
  nomCommandeur: {
    type: DataTypes.STRING(50),
    primaryKey: true,
    allowNull: false
  },
  addition: {
    type: DataTypes.INTEGER(),
    allowNull: false
  },
  bénéfice: {
    type: DataTypes.FLOAT(),
    allowNull: false
  }
 
});

module.exports = Recette;