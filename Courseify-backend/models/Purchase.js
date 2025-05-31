const { Schema, model } = require('mongoose');

const purchaseSchema = new Schema({
  userId:   { type: Schema.Types.ObjectId, required: true, ref: 'User' },
  courseId: { type: Schema.Types.ObjectId, required: true, ref: 'Course' },
  purchasedAt: { type: Date, default: Date.now },
  validTill:   { type: Date, required: true },
});

module.exports = model('Purchase', purchaseSchema);
