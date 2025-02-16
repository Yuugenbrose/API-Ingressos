const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const user = require('./user');
const TicketType = require('./ticketType');

const Purchase = sequelize.define('Purchase', {
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
});

user.hasMany(Purchase);
Purchase.belongsTo(user);

TicketType.hasMany(Purchase);
Purchase.belongsTo(ticketType);

module.exports = Purchase;
