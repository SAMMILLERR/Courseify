const { Schema, model } = require('mongoose');

const userSchema = new Schema({
  email:    { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role:     { type: String, default: 'student' },
});

module.exports = model('User', userSchema);
