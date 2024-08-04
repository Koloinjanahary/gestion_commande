// models/table.js

const { DataTypes } = require('sequelize');
const sequelize = require('../config/config');

const Test = sequelize.define('Test', {
   idPlat: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
       
      },
  nomPlat: {
    type: DataTypes.STRING(50),
    primaryKey: true,
   
  },
  PrixPlat: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  
  typePlat: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  choisi: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  
});

module.exports = Test;
