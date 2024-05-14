// const marksModel = require("../Model/marks.model");
// const streamModel = require("../Model/stream.model");
// const subjectModel = require("../Model/subject.model");
// const { UserModel } = require("../Model/user.model");

// //for getting studentList
// const  getStudentsList=async(req,res)=>{
//     try{
//     const page = parseInt(req.query.page) || 1;
//     const limit = parseInt(req.query.limit) || 10;
//     const { minAge, maxAge, sort, search } = req.query;
//     const query = {};
    
//     //Age Filtration
//     if (minAge && maxAge) {
//         query.age = { $gte: minAge, $lte: maxAge };
//       } else if (minAge) {
//         query.age = { $lte: minAge };
//       } else if (maxAge) {
//         query.age = { $gte: maxAge };
//       }

//       // Added search functionality for searching name and Users
//       if (search) {
//         query.$or = [
//           { username: { $regex: search, $options: "i" } }, // Case-insensitive search by product name
//           { email: { $regex: search, $options: "i" } }, // Case-insensitive search by product description
//         ];
//       }


//       const totalCount = await UserModel.countDocuments(query);
//       const totalPages = Math.ceil(totalCount / limit);

//       // Adding sorting Based On the Enrolled Events
//       const sortCriteria = {};
//       if (sort === "desc") {
//         sortCriteria.name = -1;
//       }else if (sort === 'asc') {
//         sortCriteria.name = 1;
//       }
     
//       //for skipping
//       const skip = (page - 1) * limit;
      
//       // Query products with filtering, searching, sorting, and pagination
//       const users = await UserModel.find(query)
//         .skip(skip)
//         .sort(sortCriteria)
//         .limit(limit);
 
//       res.status(200).json({users,totalPages});
//     }catch(err){
//         console.error("Error While filtering, searching, and paginating products:",err );      
//         res.status(500).json({ error: "Internal Server Error , Failed To get User's Details" });
//     }
// }


// //for streams
// const addStreams =async (req, res) => {
//     try {
//         const { name } = req.body;
//         const newStream = new streamModel({ name });
//         await newStream.save();
//         res.status(201).json(newStream);
//     } catch (error) {
//         res.status(400).json({ message: 'Error adding stream', error: error.message });
//     }
// };

// const updateStream= async (req, res) => {
//     try {
//         const { id } = req.params;
//         const { name } = req.body;
//         const updatedStream = await streamModel.findByIdAndUpdate(id, { name }, { new: true });
//         if (!updatedStream) {
//             return res.status(404).json({ message: 'Stream not found' });
//         }
//         res.status(200).json(updatedStream);
//     } catch (error) {
//         res.status(400).json({ message: 'Error updating stream', error: error.message });
//     }
// };

// const deleteStream = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const deletedStream = await streamModel.findByIdAndDelete(id);
//         if (!deletedStream) {
//             return res.status(404).json({ message: 'Stream not found' });
//         }
//         res.status(200).json({ message: 'Stream deleted successfully' });
//     } catch (error) {
//         res.status(400).json({ message: 'Error deleting stream', error: error.message });
//     }
// };

// //subject

// const addSubject= async (req, res) => {
//     try {
//         const { name, streams } = req.body;
//         const newSubject = new subjectModel({ name, streams });
//         await newSubject.save();
//         res.status(201).json(newSubject);
//     } catch (error) {
//         res.status(400).json({ message: 'Error adding subject', error: error.message });
//     }
// };

// const updateSubject= async (req, res) => {
//     try {
//         const { id } = req.params;
//         const { name, streams } = req.body;
//         const updatedSubject = await subjectModel.findByIdAndUpdate(id, { name, streams }, { new: true });
//         if (!updatedSubject) {
//             return res.status(404).json({ message: 'Subject not found' });
//         }
//         res.status(200).json(updatedSubject);
//     } catch (error) {
//         res.status(400).json({ message: 'Error updating subject', error: error.message });
//     }
// };


// const deleteSubject = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const deletedSubject = await subjectModel.findByIdAndDelete(id);
//         if (!deletedSubject) {
//             return res.status(404).json({ message: 'Subject not found' });
//         }
//         res.status(200).json({ message: 'Subject deleted successfully' });
//     } catch (error) {
//         res.status(400).json({ message: 'Error deleting subject', error: error.message });
//     }
// };

// //marks
// const addMarks= async (req, res) => {
//     try {
//         const { studentName, stream, subjects, marks } = req.body;
//         const newMark = new marksModel({
//             studentName, stream, subjects, marks
//         });
//         await newMark.save();
//         res.status(201).json(newMark);
//     } catch (error) {
//         res.status(400).json({ message: 'Error adding marks', error: error.message });
//     }
// };

// const updateMarks= async (req, res) => {
//     try {
//         const { id } = req.params;
//         const { marks } = req.body;  // Assuming you may want to only update the marks
//         const updatedMark = await marksModel.findByIdAndUpdate(id, { marks }, { new: true });
//         if (!updatedMark) {
//             return res.status(404).json({ message: 'Mark not found' });
//         }
//         res.status(200).json(updatedMark);
//     } catch (error) {
//         res.status(400).json({ message: 'Error updating marks', error: error.message });
//     }
// };

// const deleteMarks = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const deletedMark = await marksModel.findByIdAndDelete(id);
//         if (!deletedMark) {
//             return res.status(404).json({ message: 'Mark not found' });
//         }
//         res.status(200).json({ message: 'Mark deleted successfully' });
//     } catch (error) {
//         res.status(400).json({ message: 'Error deleting marks', error: error.message });
//     }
// };


// module.exports={
//     getStudentsList,
//     addStreams,
//     updateStream,
//     deleteStream,
//     addSubject,
//     updateSubject,
//     deleteSubject,
//     addMarks,
//     updateMarks,
//     deleteMarks,
// }

const Stream = require('../Model/stream.model');
const Subject = require('../Model/subject.model');
const Marks = require('../Model/marks.model');
const User = require('../Model/user.model');

// Admin Authentication
exports.adminLogin = (req, res) => {
  res.json({ token: req.token });
};

// Stream Operations
exports.addStream = async (req, res) => {
  try {
    const newStream = new Stream(req.body);
    await newStream.save();
    res.status(201).json(newStream);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateStream = async (req, res) => {
  try {
    const stream = await Stream.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(stream);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteStream = async (req, res) => {
  try {
    await Stream.findByIdAndRemove(req.params.id);
    res.json({ msg: 'Stream removed' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Subject Operations
exports.addSubject = async (req, res) => {
  try {
    const newSubject = new Subject(req.body);
    await newSubject.save();
    res.status(201).json(newSubject);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateSubject = async (req, res) => {
  try {
    const subject = await Subject.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(subject);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteSubject = async (req, res) => {
  try {
    await Subject.findByIdAndRemove(req.params.id);
    res.json({ msg: 'Subject removed' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Marks Operations
exports.addMarks = async (req, res) => {
  try {
    const newMarks = new Marks(req.body);
    await newMarks.save();
    res.status(201).json(newMarks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateMarks = async (req, res) => {
  try {
    const marks = await Marks.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(marks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteMarks = async (req, res) => {
  try {
    await Marks.findByIdAndRemove(req.params.id);
    res.json({ msg: 'Marks removed' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get All Students
exports.getStudentsList = async (req, res) => {
  try {
    const students = await User.find({ role: 'student' });
    res.json(students);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
