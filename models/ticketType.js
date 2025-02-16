const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const TicketType = sequelize.define('TicketType', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  availableQuantity: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
});

module.exports = TicketType;
