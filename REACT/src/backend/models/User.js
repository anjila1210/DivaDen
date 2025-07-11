const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true, // Ensure no duplicate emails
  },
  password: {
    type: String,
    required: true,
  },
}, {
  timestamps: true // adds createdAt and updatedAt
});

module.exports = mongoose.model('User', userSchema);
