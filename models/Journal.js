const { DataTypes } = require('sequelize');
const sequelize = require('../config/config');

const Journal = sequelize.define('Journal', {
    idCmd: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement : true
      },
      numCmd: {
        type: DataTypes.STRING(50),
        
        
      },
      nomCommandeur: {
        type: DataTypes.STRING(50),
        
        
      },
  Description: {
    type: DataTypes.TEXT(),
    allowNull: false
   
  },
  Statut: {
    type: DataTypes.STRING(50),
    allowNull: false
   
  },
  Addition  : {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  
});

module.exports = Journal;
