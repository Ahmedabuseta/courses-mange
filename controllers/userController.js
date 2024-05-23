const express = require("express");
const Users = require("../models/userModel");
const jsend = require("jsend");
const app = express();
app.use(express.json());

const bcrypt = require("bcrypt");
const generateJWT = require("../utilities/generateJWT");
const asyncWrapper = require("../middlewares/asyncWrapper");
const appError = require("../utilities/appError");

const getAllUsers = async (req, res) => {
  const query = req.query;
  const limit = query.limit || 10;
  const page = query.page || 1;
  const skip = (page - 1) * limit;
  Users.find({}, { __v: 0, password: 0 })
    .limit(limit)
    .skip(skip)
    .then((users) => {
      res.status(200).json(jsend.success(users));
    });
};
const register = asyncWrapper(async (req, res, next) => {
  const { firstName, lastName, email, password, role } = req.body;

  if (!firstName || !lastName || !email || !password) {
    const error = appError.create(400, "All fields are required.");
    return next(error);
  }

  const existUser = await Users.findOne(
    { email: email },
    { __v: 0, password: 0 }
  );
  if (existUser) {
    const error = appError.create(400, "this email is already exist");
    return next(error);
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new Users({
    firstName,
    lastName,
    email,
    password: hashedPassword,
    role,
  });

  const token = await generateJWT({
    email: newUser.email,
    id: newUser._id,
    role: newUser.role,
  });
  newUser.token = token;

  console.log(newUser, token);

  await newUser.save();

  return res.status(201).json(jsend.success({ newUser }));
});

const login = asyncWrapper(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    const error = appError.create(400, "All fields are required.");
    return next(error);
  }
  const user = await Users.findOne({ email: email }, { __v: 0 });
  if (!user) {
    const error = appError.create(400, "this email is not exist");
    return next(error);
  }
  console.log(user);
  const matchedPassword = await bcrypt.compare(password, user.password);
  if (user && matchedPassword) {
    const token = await generateJWT({
      email: user.email,
      id: user._id,
      role: user.role,
    });
    return res.status(200).json(jsend.success({ token }));
  } else {
    const error = appError.create(500, "email or password isn't matched ");
    return next(error);
  }
});

module.exports = {
  getAllUsers,
  register,
  login,
};
