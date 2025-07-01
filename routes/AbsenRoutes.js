const express = require('express');
const router = express.Router();
const absenRepo = require('../repository/AbsenRepo')

router.post('/attendance',async(req,res) => {
try {
const {employee_nik,status} =req.body
 if (!employee_nik || !status) {
      return res.status(400).json({ message: "employee_nik and status are required" });
    }

const result = await absenRepo.createAttendance({employee_nik,status});
res.json({message: "Attendance Recorded",data:result});
} catch (error) {
res.status(500).json({error: error.message});
}});

router.post('/summary',async(req,res) => {
    try {
    const {from,to} = req.query;
    const {employee_nik} = req.body;

    const now = new Date();
    const today = now.toISOString().split('T')[0];
    const firstOfMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-01`;

    const result = await absenRepo.getSummary(
        employee_nik,
        from || firstOfMonth,
        to || today
    );

    res.json(result);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
})  

module.exports = router; 
