const Attendance = require('../models/absen-models');
const { Op } = require('sequelize');
const { all } = require('../routes/auth-routes');
module.exports ={
  async  createAttendance({ employee_nik, status }) {
  const now = new Date();
  const date = now.toISOString().split('T')[0];
  const time = now.toTimeString().split(' ')[0];

  const lastAttendance = await Attendance.findOne({
    where: { employee_nik, date },
    order: [['time', 'DESC']]
  });

  // Validasi check-in dan check-out
  if (status === "check-in") {
    if (lastAttendance && lastAttendance.status === "check-in") {
      throw new Error("Anda sudah check-in hari ini, silakan check-out terlebih dahulu.");
    }
  } else if (status === "check-out") {
    if (!lastAttendance || lastAttendance.status !== "check-in") {
      throw new Error("Tidak dapat check-out sebelum melakukan check-in.");
    }
  }

  return await Attendance.create({
    employee_nik,
    date,
    time,
    status
  });
},
  async getSummary(employee_nik,from,to){
  if(!employee_nik || employee_nik.trim()==="" || employee_nik === null){
  const allAttedance = await Attendance.findAll();
  return allAttedance; 
  }
        return await Attendance.findAll({
            where: {
                employee_nik,
                date:{
                    [Op.between]: [from, to]
                }
            },
            order:[['date','ASC'],['time','ASC']]
        })
    }
}