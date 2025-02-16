const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const user = sequelize.define('user', {
  nameUser: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  paper: {
    type: DataTypes.ENUM('user', 'admin'),
    defaultValue: 'user'
  }
});

module.exports = user;