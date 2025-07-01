const User = require('../models/UserModels');
const bcrypt = require('bcryptjs');
const { db } = require('../config/firebase-admin');

module.exports = {
    async findByUsername(username){
        return await User.findOne({ where: {username}});
    },

    async findById(nik){
    if(!nik || nik.trim()==="" || nik === null){
        const allUser = await User.findAll();
         return allUser; 
  }
        return await User.findByPk(nik,{
            attributes:['nik','name','email','photo','position','phone_number']
        })
    },

    async createUser({nik,name,email,password,position,role,username,phone_number}){
        const hashed = bcrypt.hashSync(password,10);
        return await User.create({nik,name,email,username,password: hashed,position,role,phone_number});
    },
async deleteEmployeeByNik(nik) {
    const result = await User.destroy({
      where: { nik },
    });
    return result; 
},
    async updateUser (nik, {name,email,password,position,role,username,phone_number,photo}){
        const user = await User.findByPk(nik);
        if (!user) throw new Error('User tidak ditemukan');
         if (phone_number) user.phone_number = phone_number;
    if (photo) user.photo = photo;
    if(name) user.name = name;
    if(email) user.email = email;
    if(position) user.position = position;
    if(role) user.role = role;
    if(username) user.username = username;
    if (password) user.password = bcrypt.hashSync(password, 10);
    await user.save();
    return user;
    }
}

