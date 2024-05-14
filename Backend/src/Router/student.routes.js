const express = require("express");
const { registerStudent, loginStudent, logoutStudent, getStudentById, getStudentPerformance } = require("../Controller/student.controller");
const { auth } = require("../middleWare/auth.middleware");
const { access } = require("../middleWare/rolebased.middleware");


const studentRouter = express.Router();

studentRouter.post("/register",registerStudent)

studentRouter.post("/login",loginStudent)

studentRouter.post("/logout",auth,logoutStudent);

studentRouter.get("/profile/:id",auth,access("student"),getStudentById);

studentRouter.get('/performance/:id',auth,access("student"),getStudentPerformance);

module.exports={
    studentRouter
}