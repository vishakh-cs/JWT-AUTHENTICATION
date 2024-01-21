const express = require('express');
const UserModel = require('../Database/users')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
require('dotenv').config();
const jwtKey =process.env.JWT_SECRET



// console.log("key",process.env.JWT_SECRET);


const SignupUser = async (req, res) => {
  console.log('Received signup request');
  const { email, username, password } = req.body;
  console.log(email, username, password);

  try {

    const existingUser = await UserModel.findOne({ $or: [{ email }, { username }] });

    if (existingUser) {
      return res.status(400).json({ success: false, message: 'Username or email already exists' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new UserModel({
      email,
      username,
      password: hashedPassword,
    });

    await newUser.save();

    return res.json({ success: true, message: 'User registered successfully' });
  } catch (error) {
    console.error('Signup failed:', error);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
};



const loginUser = async (req, res) => {
  const { email, password } = req.body;
  console.log("hi iam login");
  try {
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
   
    const userName= user.username

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ success: false, message: 'Invalid password' });
    }

    console.log('JWT Secret Key Used for Login:', process.env.JWT_SECRET);

    const token = jwt.sign({ userId: user._id, username: user.username }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });
    console.log("token", token);
    req.token=token

    // Set the JWT as an HTTP cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure:false, 
      maxAge: 60 * 60 * 1000,
    });
    
    return res.json({
      success: true,
      message: 'Login successful',
      userName: user.username,
      email: user.email,
      token:token,
      userId: user._id,
      profileImage:user.profileImage,
      isBlocked:user.isBlocked,
    });
  } catch (error) {
    console.error('Login failed:', error);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

const profileImage = async (req, res) => {
  try {
    const userId = req.body.userId; 
    console.log("Received userId:", userId);

    // Check if the request contains a file
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No file provided' });
    }

    // Save the image information to the user in the database
    await UserModel.findByIdAndUpdate(userId, { profileImage: req.file.filename }, { new: true });

    return res.json({
      success: true,
      message: 'Profile image uploaded successfully',
      photoUrl: `${req.file.filename}`
    });
  } catch (error) {
    console.error('Profile image upload failed:', error);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

const logout=async(req,res)=>{

  try {
    const token = req.body.token;

    res.clearCookie('token'); 

    return res.json({
      success: true,
      message: 'Logout successful',
    });
  } catch (error) {
    console.error('Logout failed:', error);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

module.exports = {
  SignupUser,
  loginUser,
  profileImage,
  logout,
}
