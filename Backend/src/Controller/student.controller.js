
// const bcrypt = require("bcrypt");


// require("dotenv").config();
// const jwt = require('jsonwebtoken');
// const { blacklistModel } = require("../Models/blacklist.model");
// const { StudentModel } = require("../Models/student.model");
// const { MarksModel } = require("../Models/marks.model");

// const registerStudent = async (req, res) => {
//     const { email, password, name } = req.body;
//     try {
//         // Check if Student already exists
//         const existingStudent = await StudentModel.findOne({ email });
//         if (existingStudent) {
//             return res.status(409).json({ message: "Student with this email already exists" });
//         }
//         const Students=await StudentModel.find();
//         let id=1;
//         if(Students&&Students.length>0){
//           Students.sort((a, b) => a.StudentId - b.StudentId)
//              id=Students[Students.length-1].StudentId;
//              id=id+1;
//         }
//     const StudentId=id;
//         // Hash the password
//         const hashedPassword = await bcrypt.hash(password, 10);

//         // Create a new Student
//         const newStudent = new StudentModel({ StudentId,email, password: hashedPassword, name });
//         await newStudent.save();

//         // Send success response
//         return res.status(201).json({ message: "Student registered successfully" });
//     } catch (error) {
//         // Handle errors
//         console.error("Error registering Student:", error);
//         res.status(500).json({ message: "Internal server error" });
//     }
// };

// const loginStudent = async (req, res) => {
//     const { email, password } = req.body;
//     try {
//         const Student = await StudentModel.findOne({ email });


//         if (!Student) {
//             return res.status(401).send("Student is not found try to login");
//         }
//         bcrypt.compare(password, Student.password, (err, result) => {
//             if (err) throw new Error(err.message);
//             if (result) {

//                 const access_token = jwt.sign(
//                     { StudentId: Student.StudentId, email, role: Student.role },
//                     "masai",
//                     { expiresIn: "1h" }
//                 );
//                 const refresh_token = jwt.sign(
//                     { StudentId: Student.StudentId, email, role: Student.role },
//                     "masai",
//                     { expiresIn: "1h" }
//                 );
//                 return res.json({ message: 'Student login successfully', accessToken: access_token, refreshToken: refresh_token })
//             } else {
//                 return res.status(401).json({ message: "Student credential is wrong" })
//             }
//         })

//     } catch (err) {
//         res.status(400).json({ message: err.message });
//     }
// }

// const logoutStudent = async (req, res) => {
//     const header = req.headers['authorization'];
//     const token = header.split(" ")[1];
//     try {
//         if (!token) {
//             return res.status(401).send("token is not provided");
//         }
//         const StudentToken = new blacklistModel({ token });
//         await StudentToken.save();
//         res.status(200).send('Student logout successfully');
//     } catch (err) {
//         return res.status(400).json({ message: err.message });

//     }
// }

// const getStudentById = async (req, res) => {
//     const studentId = req.params.id;
//     try {
//         const student = await StudentModel.findById(studentId).populate("stream").populate("subject");
//         if (!student) {
//             return res.status(404).json({ message: "Student not found" });
//         }
//         res.json(student);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: "Server Error" });
//     }
// };

// const getStudentPerformance = async (req, res) => {
//     const studentId = req.params.id;
//     try {
//         const student = await StudentModel.findById(studentId);
//         if (!student) {
//             return res.status(404).json({ message: "Student not found" });
//         }

//         const marks = await MarksModel.find({ student: studentId }).populate("subject");
        
//         let totalMarks = 0;
//         marks.forEach(mark => {
//             totalMarks += mark.marks;
//         });

//         const resultCard = {
//             student: {
//                 id: student._id,
//                 name: student.name,
//                 email: student.email,
//             },
//             marks,
//             totalMarks
//         };

//         res.json(resultCard);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: "Server Error" });
//     }
// };

// module.exports = {
//     registerStudent,
//     loginStudent,
//     logoutStudent,
//     getStudentById,
//     getStudentPerformance

// }

const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const { blacklistModel } = require("../Models/blacklist.model");
const { StudentModel } = require("../Models/student.model");
const { MarksModel } = require("../Models/marks.model");
const { StreamModel } = require("../Models/stream.model");
const { SubjectModel } = require("../Models/subject.model");

const registerStudent = async (req, res) => {
  const { username, email, password, role } = req.body;
  try {
    let existingUser = await StudentModel.findOne({ email });
    if (existingUser) {
      return res.status(400).send({ message: "Student already exist" });
    }
    const student = new StudentModel({
      username,
      email,
      password: await bcrypt.hash(password, 10),
     
      role,
    });
    await student.save();
    res.status(201).json({ message: "Student registered Successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "internal server error" });
  }
};

const loginStudent = async (req, res) => {
  const { email, password } = req.body;
  try {
    let user = await StudentModel.findOne({ email });
    if (!user) {
      return res.status(404).send({ message: "Student not found" });
    }
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return res.status(401).send("Invalid Credentials");
    }
    const jwt_payload = { id: user._id, email, role: user.role };
    
    // Make sure the SECRET_KEY is properly configured
    if (!process.env.SECRET_KEY) {
      throw new Error("SECRET_KEY is not defined in the environment variables");
    }

    const token = jwt.sign(jwt_payload, process.env.SECRET_KEY, { expiresIn: "1h" });
    res.status(200).send({ message: "Login successful", token, role: user.role });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "internal server error" });
  }
};

const logoutStudent = async (req, res) => {
  try {
    const { token } = req.headers; 
    const existingToken = await blacklistModel.findOne({ token });
    if (existingToken) {
      return res.status(400).json({ message: 'Token already blacklisted' });
    }

    const blacklistEntry = new blacklistModel({ token });
    await blacklistEntry.save();

    res.status(200).json({ message: 'Logout successful' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
const getStudentById = async (req, res) => {
  const studentId = req.params.id;
  try {
    const student = await StudentModel.findById(studentId).populate("stream").populate("subject");
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.json(student);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

const getStudentPerformance = async (req, res) => {
  const studentId = req.params.id;
  try {
    const student = await StudentModel.findById(studentId);
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    const marks = await MarksModel.find({ student: studentId }).populate("subject");

    let totalMarks = 0;
    marks.forEach(mark => {
      totalMarks += mark.marks;
    });

    const resultCard = {
      student: {
        id: student._id,
        name: student.name,
        email: student.email,
      },
      marks,
      totalMarks
    };

    res.json(resultCard);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = {
  registerStudent,
  loginStudent,
  logoutStudent,
  getStudentById,
  getStudentPerformance
};
