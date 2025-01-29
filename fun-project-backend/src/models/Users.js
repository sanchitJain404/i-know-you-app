const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
  hobbies: { type: [String], default: [] },
  current_company: { type: String, default: '' },
  birthplace: { type: String, default: '' },
  quote: { type: String, default: '' }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
