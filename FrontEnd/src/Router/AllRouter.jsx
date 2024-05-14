import React from 'react'
import { Route, Routes } from 'react-router-dom'
import StudentDashboard from '../Pages/StudentDashboard'
import AdminDashboard from '../Pages/AdminDashboard'
import AdminLogin from '../components/AdminLogin'
import StudentLogin from '../components/StudentLogin'
import Signup from '../components/Signup'

export default function AllRouter() {
  return (
    <div>
      <Routes>
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path='/student/login' element={<StudentLogin/>} />
        <Route path="/student/register" element={<Signup/>} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/student/dashboard" element={<StudentDashboard />} />
     
      
        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </div>
  )
}
