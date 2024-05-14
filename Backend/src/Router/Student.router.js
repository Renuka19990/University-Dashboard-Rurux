const express = require('express');
const StudentRoute = express.Router();
const studentController = require('../Controller/student.controller');
const auth = require('../middleWare/auth.middleware');

StudentRoute.get('/profile', auth, studentController.getStudentProfile);
StudentRoute.put('/profile', auth, studentController.updateStudentProfile);
StudentRoute.get('/performance', auth, studentController.getStudentPerformance);

module.exports = StudentRoute;
