import React, {  useContext } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Login from '../Pages/Login';
import Signup from '../Pages/Signup';
import PrivateRoute from './PrivateRoute';
import StudentList from '../AdminPage.jsx/Students';
import MarksPage from '../AdminPage.jsx/Marks';

import SubjectPage from '../AdminPage.jsx/SubjectPage';
import StreamPage from '../AdminPage.jsx/Stream';


const AllRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<Signup/>} />
        
          <Route path="/" element={<StudentList/>}  />
          <Route path="/studentList" element={<PrivateRoute Component={StudentList} />} />
          <Route path="/marks" element={<PrivateRoute Component={MarksPage} />} />
          <Route path="/stream" element={<PrivateRoute Component={StreamPage} />} />
          <Route path="/subject" element={<PrivateRoute Component={SubjectPage} />} />
       
      </Routes>
    </>
  );
};

export default AllRoutes;
