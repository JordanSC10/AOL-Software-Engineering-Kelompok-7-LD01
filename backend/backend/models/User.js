const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  ktp: String
});

// 🔥 anti overwrite error
module.exports = mongoose.models.User || mongoose.model('User', userSchema);