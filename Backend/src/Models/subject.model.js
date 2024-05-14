const mongoose = require("mongoose");

const subjects = mongoose.Schema({
    name : String,
	streamsID : { type: String, ref: 'streams'}
},{
    versionKey:false
})

const SubjectModel = mongoose.model('subjects',subjects);

module.exports={
    SubjectModel
}