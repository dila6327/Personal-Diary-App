const mongoose = require('mongoose');

const EntrySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  date: { type: String },
  note: { type: String },
  image: { type: String },
  voice: { type: String },
  mood: { type: String },
  recommendations: { type: String },
});

module.exports = mongoose.model('Entry', EntrySchema);
