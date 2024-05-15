const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    username:{type:String,required:true},
    email:{type:String, required:true},
    password:{type:String, required:true},
    stream:{type:mongoose.Schema.Types.ObjectId, ref:'Stream'},
    subject:{type:mongoose.Schema.Types.ObjectId,ref:'Subject'},
    role: {
        type: String,
        default: "student",
        enum: ["student", "admin"],
      }
},
{
  versionKey: false,
})

const StudentModel = mongoose.model('students',studentSchema);

module.exports={
    StudentModel
}