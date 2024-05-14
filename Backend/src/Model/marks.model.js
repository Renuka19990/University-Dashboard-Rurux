const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const markSchema = new Schema({
  studentName: { type: Schema.Types.ObjectId, ref: 'Student' },
  stream: { type: Schema.Types.ObjectId, ref: 'Stream' },
  subjects: { type: Schema.Types.ObjectId, ref: 'Subject' },
  marks: { type: Number, required: true }
});

module.exports = mongoose.model('Mark', markSchema);
