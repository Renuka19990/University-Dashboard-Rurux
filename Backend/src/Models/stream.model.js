const mongoose = require("mongoose");

const stream = mongoose.Schema({
	
        name : String

},{
    versionKey:false
})

const StreamModel = mongoose.model('streams',stream);

module.exports={
    StreamModel
}