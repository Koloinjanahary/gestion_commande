// models/table.js

const { DataTypes } = require('sequelize');
const sequelize = require('../config/config');

const Table = sequelize.define('Table', {
  
  nomTab: {
    type: DataTypes.STRING(50),
    primaryKey: true,
   
  },
  capacite: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  
});

module.exports = Table;
