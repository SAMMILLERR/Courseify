const { Schema, model } = require('mongoose');

const courseSchema = new Schema({
  title:       { type: String, required: true },
  description: { type: String, required: true },
  price:       { type: Number, required: true },
  contentUrl:  { type: String, required: true },
}, { timestamps: true });

module.exports = model('Course', courseSchema);
