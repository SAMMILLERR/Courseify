const { Schema, model } = require('mongoose');

const adminSchema = new Schema({
  email:    { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role:     { type: String, default: 'admin' },
});

module.exports = model('Admin', adminSchema);
