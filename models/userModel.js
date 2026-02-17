const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, lowercase: true, unique: true },
  password: { type: String, required: true, minLength: 6 },
  deliveryAddress: { type: String, required: true, minLength: 5 },
  role: { type: String, enum: ["user", "admin", "seller"], default: "user" }
});

const User = mongoose.model("User", userSchema);
module.exports = User;
