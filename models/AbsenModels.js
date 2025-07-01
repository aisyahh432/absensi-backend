const { DataTypes } = require('sequelize');
const sequelize = require('../config/db')

const Attendance = sequelize.define('attendance',{
  employee_nik: { type: DataTypes.STRING, allowNull: false },
  date: { type: DataTypes.DATEONLY, allowNull: false },
  time: { type: DataTypes.TIME, allowNull: false },
  status: { type: DataTypes.ENUM('check-in', 'check-out'), allowNull: false }
},{
  tableName :'attendance',
  timestamps : true
});
module.exports = Attendance;
