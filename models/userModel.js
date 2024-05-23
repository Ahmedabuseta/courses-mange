const mongoose = require("mongoose");
const validator = require("validator");
const userRole = require("../utilities/userRoles");
const userScheme = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: [validator.isEmail, "please write valid email"],
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    validate: {
      validator: function (value) {
        return validator.isStrongPassword(value);
      },
      message: 'Please choose a stronger password. It must contain uppercase letter, lowercase letter, 1 number, and special character.',
    },
  },
  token: {
    type: String
  },
  role: {
    type: String,
    enum: [userRole.ADMIN, userRole.MANGER, userRole.USER],
    default:userRole.USER,
  },
  avatar:{
    type:String,
    default:'uploads/avatar.png'
  }
});
module.exports = mongoose.model("User", userScheme);
