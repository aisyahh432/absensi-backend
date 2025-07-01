const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const userRepo = require('../repository/AuthRepo')
const { db } = require('../config/firebase-admin'); 

// REGISTER
router.post('/register', async (req, res) => {
  try {
    const user = await userRepo.createUser(req.body);
    res.json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


router.post('/login', async (req, res) => {
  const user = await userRepo.findByUsername(req.body.username);
  
  if (!user) return res.status(404).json({ message: 'Username tidak ditemukan' });

  const valid = require('bcryptjs').compareSync(req.body.password, user.password);
  if (!valid) return res.status(401).json({ message: 'Password salah' });

  const token = jwt.sign({ nik: user.nik }, 'secret-key');
  res.json({ token, user });
});

//find
router.post('/find', async (req, res) => {
  try {
    const user = await userRepo.findById(req.body.nik);
    if (!user) return res.status(404).json({ message: 'User tidak ditemukan' });
    res.json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.post('/update', async (req, res) => {
  try {
    const { nik,name,email,password,position,role,username,phone_number,photo} = req.body;

    const user = await userRepo.updateUser(nik, {
      phone_number,
      name,
      email,
      position,
      role,username,
      photo,
      password,
    });

    await db.collection('users').add({
      type: 'profile-update',
      message: `${user.name} mengubah profil.`,
      timestamp: new Date(),
    });

    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
});


router.post('/logout', async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    res.status(200).json({ message: 'Logout successful' });
  } catch (error) {
    console.error('Logout Error:', error.message);
    res.status(500).json({ error: 'Something went wrong during logout.' });
  }
});

router.post('/delete', async (req, res) => {
  try {
    const user = await userRepo.deleteEmployeeByNik(req.body.nik);
    res.status(200).json({ message: 'Delete successful' });
  } catch (error) {
       res.status(400).json({ error: error.message });

  }
});
module.exports = router;
