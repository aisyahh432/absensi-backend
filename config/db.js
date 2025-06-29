const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('users_office', 'root', '', {
  host: 'localhost',
  dialect: 'mysql'
});

module.exports = sequelize;