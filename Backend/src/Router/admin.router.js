// const { getStudentsList, addStreams, updateStream, deleteStream, addSubject, updateSubject, deleteSubject, addMarks, updateMarks, deleteMarks } = require("../Controller/admin.controller");
// const express = require("express");



// const adminRouter=express.Router();

// adminRouter.get('/studentList',getStudentsList);


// //stream
// adminRouter.post('/streams/add',addStreams);

// adminRouter.patch('/stream/update/:id',updateStream);

// adminRouter.delete('/stream/delete/:id',deleteStream);

// //subject
// adminRouter.post('/subject/add',addSubject);

// adminRouter.patch('/subject/update/:id',updateSubject);

// adminRouter.delete('/subject/delete/:id',deleteSubject);

// //Marks

// adminRouter.post('/marks/add',addMarks);

// adminRouter.patch('/marks/update/:id',updateMarks);

// adminRouter.delete('/marks/delete/:id',deleteMarks);

// module.exports={adminRouter};

const {
  getStudentsList,
  addStream,
  updateStream,
  deleteStream,
  addSubject,
  updateSubject,
  deleteSubject,
  addMarks,
  updateMarks,
  deleteMarks
} = require('../Controller/admin.controller');
const express = require('express');
const auth = require('../middleWare/auth.middleware');
const roleBased = require('../middleWare/rolebased.middleware');

const adminRouter = express.Router();

// Student List
adminRouter.get('/studentList', [auth, roleBased('admin')], getStudentsList);

// Stream
adminRouter.post('/streams/add', [auth, roleBased('admin')], addStream);
adminRouter.patch('/stream/update/:id', [auth, roleBased('admin')], updateStream);
adminRouter.delete('/stream/delete/:id', [auth, roleBased('admin')], deleteStream);

// Subject
adminRouter.post('/subject/add', [auth, roleBased('admin')], addSubject);
adminRouter.patch('/subject/update/:id', [auth, roleBased('admin')], updateSubject);
adminRouter.delete('/subject/delete/:id', [auth, roleBased('admin')], deleteSubject);

// Marks
adminRouter.post('/marks/add', [auth, roleBased('admin')], addMarks);
adminRouter.patch('/marks/update/:id', [auth, roleBased('admin')], updateMarks);
adminRouter.delete('/marks/delete/:id', [auth, roleBased('admin')], deleteMarks);

module.exports = adminRouter;
