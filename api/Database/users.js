const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  isBlocked:{
    type : Boolean ,
    default : false
  },
  profileImage: {
    type: String,
  },
});

const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;
