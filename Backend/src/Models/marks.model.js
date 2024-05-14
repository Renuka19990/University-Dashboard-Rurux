const mongoose = require("mongoose");

const marks = mongoose.Schema({
	studentName : { type: mongoose.Schema.Types.ObjectId, ref: 'students'},
	stream : { type: mongoose.Schema.Types.ObjectId, ref: 'streams'},
	subjects : { type: mongoose.Schema.Types.ObjectId, ref: 'subjects'},
	marks : Number
},{
    versionKey:false
})

const MarksModel = mongoose.model('marks',marks);

module.exports={
    MarksModel
}