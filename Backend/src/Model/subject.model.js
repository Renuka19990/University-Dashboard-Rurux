const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const subjectSchema = new Schema({
  name: { type: String, required: true },
  streams: { type: Schema.Types.ObjectId, ref: 'Stream' }
});

module.exports = mongoose.model('Subject', subjectSchema);
