const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const studentSchema = new Schema({
  userName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password:{ type: String, required: true, unique: true},
  age: { type: Number },
  stream: { type: Schema.Types.ObjectId, ref: 'Stream' },
  subject: { type: Schema.Types.ObjectId, ref: 'Subject' }
});

module.exports = mongoose.model('Student', studentSchema);
