const sequelize = require('../config/db');

const { DataTypes } = require('sequelize');

const User = sequelize.define('User', {
  nik: {
    type: DataTypes.STRING,
    primaryKey: true
  },
  name: DataTypes.STRING,
  email: DataTypes.STRING,
  username: {
    type: DataTypes.STRING,
    unique: true
  },
  password: DataTypes.STRING,
  position: DataTypes.STRING,
  photo: DataTypes.STRING,
  phone_number: DataTypes.STRING,
  role:DataTypes.STRING
}, {
  tableName: 'users',
  timestamps: true, 
  underscored: true 
});

module.exports = User;
