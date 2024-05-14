// const mongoose = require("mongoose");
// const studentModel = require("../Model/student.model");
// const bcrypt=require("bcrypt");
// const jwt=require("jsonwebtoken");
// const marksModel = require("../Model/marks.model");
// //for getting All students

//  const getStudents = async (req, res) => {
//   try {
//     const page = parseInt(req.query.page) || 1;
//     const limit = parseInt(req.query.limit) || 20;
//     const { minAge, maxAge, stream, sort, search } = req.query;
//     const query = {};

//     // age Filtration
//     if (minAge && maxAge) {
//       query.age = { $gte: minAge, $lte: maxAge };
//     } else if (minAge) {
//       query.age = { $lte: minAge };
//     } else if (maxAge) {
//       query.age = { $gte: maxAge };
//     }

//     // stream  filtration
//     if (stream) {
//       query.location = stream;
//     }

//     // Added search functionality for searching
//     if (search) {
//       query.$or = [
//         { name: { $regex: search, $options: "i" } },
//         { stream: { $regex: search, $options: "i" } },
//         { subject: { $regex: search, $options: "i" } },
//       ];
//     }
//     const totalCount = await studentModel.countDocuments(query);
//     const totalPages = Math.ceil(totalCount / limit);

//     // Adding sorting based on the event date
//     const sortCriteria = {};
//     if (sort === "desc") {
//       sortCriteria.name = -1;
//     } else {
//       sortCriteria.name = 1;
//     }
//     // For skipping
//     const skip = (page - 1) * limit;
//     // Query events with filtering, searching, sorting, and pagination
//     const students = await studentModel
//       .find(query)
//       .skip(skip)
//       .sort(sortCriteria)
//       .limit(limit);

//     res.status(200).json({ students, totalPages });
//   } catch (err) {
//     console.error(
//       "Error while filtering, searching, and paginating events:",
//       err
//     );
//     res.status(500).json({ error: err.message || "Internal Server Error" });
//   }
// };
// module.exports={
//     getStudents
// }

// //for getting Particular Student Based On id
// const studentData = async (req, res) => {
//   const { id } = req.params;
//   try {
//     const studentData = await studentModel.find({ studID: id });
//     if (!studentData) {
//       return res
//         .status(404)
//         .json({ error: true, message: "Student  Not Found" });
//     }
//     res.status(200).json({ error: false, item: studentData });
//   } catch (error) {
//     console.log(error);
//     res.status(404).json({ error: true, message: error });
//   }
// };

// //for registering a Student
// const register = async (req, res) => {
//   const { email, userName, password, age, stream, subject } = req.body;
//   const saltRounds = 10;
//   try {
//     const hashedPassword = await bcrypt.hash(password, saltRounds);
//     const isStudent = new studentModel({
//       email,
//       userName,
//       password: hashedPassword,
//       age,
//       stream,
//       subject,
//     });
//     await isStudent.save();
//     res.status(201).send({ error: false, items: isStudent });
//   } catch (error) {
//     console.log(error.message);
//     return res.status(500).send({ error: true, message: error.message });
//   }
// };

// //for student login
// const Login = async (req, res) => {
//   const { email, password } = req.body;
//   const saltRounds = 10;
//   try {
//     const isStudentExists = await studentModel.findOne({ email });
//     if (!isStudentExists) {
//       return res
//         .status(401)
//         .send({ error: true, message: "Given credentials are invalid" });
//     }

//     const checkPassword = await bcrypt.compare(
//       password,
//       isStudentExists.password
//     );
//     if (checkPassword) {
//       const accessToken = jwt.sign(
//         {
//           data: { email: isStudentExists.email, name: isStudentExists.name },
//         },
//         process.env.SECRET_KEY,
//         { expiresIn: "1h" }
//       );

//       return res.status(201).send({ error: false, accessToken });
//     } else {
//       return res
//         .status(401)
//         .send({ error: true, message: "Given credentials are invalid" });
//     }
//   } catch (error) {
//     console.log(error.message);
//     return res.status(500).send({ error: true, message: error.message });
//   }
// };
// module.exports = {
//   getStudents,
//   studentData,
//   register,
//   Login,
// };


// exports.getStudentProfile = async (req, res) => {
//   try {
//     const student = await studentModel.findById(req.user.id).select('-password');
//     res.json(student);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// exports.updateStudentProfile = async (req, res) => {
//   try {
//     const student = await studentModel.findByIdAndUpdate(req.user.id, req.body, { new: true }).select('-password');
//     res.json(student);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// exports.getStudentPerformance = async (req, res) => {
//   try {
//     const marks = await marksModel.find({ student: req.user.id }).populate('subject');
//     res.json(marks);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };


const User = require('../Model/user.model');
const Marks = require('../Model/marks.model');

exports.getStudentProfile = async (req, res) => {
    try {
        const student = await User.findById(req.user.id).select('-password');
        res.json(student);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updateStudentProfile = async (req, res) => {
    try {
        const student = await User.findByIdAndUpdate(req.user.id, req.body, { new: true }).select('-password');
        res.json(student);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getStudentPerformance = async (req, res) => {
    try {
        const marks = await Marks.find({ student: req.user.id }).populate('subject');
        res.json(marks);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
