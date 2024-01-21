const express = require('express');
const UserModel = require('../Database/users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const jwtKey = process.env.JWT_SECRET;
const ADMINID = process.env.ADMINID;
const ADMINPASS = process.env.ADMINPASSWORD;
require('dotenv').config();

const adminLogin = async (req, res) => {

    try {

        let { email, password } = req.body;
        console.log(email, password);

        if (email === ADMINID && password === ADMINPASS) {

            const user = await UserModel.find()

            const blockedorNot = user.isBlocked

            const token = jwt.sign({ email: ADMINID }, jwtKey, { expiresIn: '1h' });

            return res.status(200).json({ success: true, token, user,blockedorNot });
        } else {

            return res.status(401).json({ success: false, msg: "Invalid email or password" });
        }
    } catch (error) {
        console.error('Admin login failed:', error.message);
        return res.status(500).json({ success: false, msg: "Internal Server Error" });
    }
};


const deleteUser = async (req, res) => {
    try {
        const userId = req.params.userId;

        // Check if the user with the given ID exists
        const user = await UserModel.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, msg: "User not found" });
        }

        // Delete the user
        await UserModel.findByIdAndDelete(userId);
        const updatedUserData = await UserModel.find();

        return res.status(200).json({ success: true, user: updatedUserData });

    } catch (error) {
        console.error('Error deleting user:', error.message);
        return res.status(500).json({ success: false, msg: "Internal Server Error" });
    }
};

const blockUser = async (req, res) => {
    try {
        const userId = req.params.userId;

        // Check if the user with the given ID exists
        const user = await UserModel.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, msg: "User not found" });
        }
        user.isBlocked = !user.isBlocked;

        await user.save();

        return res.status(200).json({ success: true, msg: "User blocked successfully" });
    } catch (error) {
        console.error('Error blocking user:', error.message);
        return res.status(500).json({ success: false, msg: "Internal Server Error" });
    }
};


   const checkEmailAvailability = async (req, res) => {
    try {
      const { email } = req.body;
      const existingUser = await UserModel.findOne({ email });
  
      res.json({ available: !existingUser });
    } catch (error) {
      console.error('Error checking email availability:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

module.exports = {
    adminLogin,
    deleteUser,
    blockUser,
    checkEmailAvailability,
};
