
const express = require("express");
const router = express.Router();
const Joi = require('joi');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require("../models/userModel");

const joiSchema = Joi.object({
  username: Joi.string().required().min(3).max(30),
  email: Joi.string().email().required().lowercase(),
  password: Joi.string().required().min(6),
  deliveryAddress: Joi.string().required().min(5),
  role:Joi.string()
});
//new user registered api
router.post("/", async (req, res) => {
  //validate data from frontend
  const { username, email, password, deliveryAddress } = req.body;
  //validate with joi
  const { error, value } = joiSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  //check user already register or not
  const user = await User.findOne({ email: email });
  if (user) {
  return res.status(400).json({message:"User is already registered!!!"})
}
  const hashedPass = await bcrypt.hash(password, 10);
  const newUser = new User({
    username,
    email,
    password: hashedPass,
    deliveryAddress
  });
  await newUser.save();
  const token = generateToken({ _id: newUser._id, username: newUser.username, role: newUser.role });
  console.log('newUser', newUser)
  res.status(201).json(token);
});


const generateToken = (object) => {
  return jwt.sign(
    object,
    process.env.JWT_SECRET,
    { expiresIn: "3h" }
  );
}

//user can login with email,password

//if user already registered some time ago they atomaticly logging in

module.exports = router;
