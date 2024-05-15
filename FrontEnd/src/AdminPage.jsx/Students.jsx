import React, { useEffect, useState } from "react";
import axios from 'axios';
import { Table, Thead, Tbody, Tr, Th, Td, Box, Text } from "@chakra-ui/react";

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchStudentList();
  }, []);

  const fetchStudentList = async () => {
    try {
      const response = await axios.get("https://university-dashboard-rurux.onrender.com/adminApi/studentlist", {
        withCredentials: true, // Include this line to ensure cookies are sent if needed
      });
      console.log("Fetched data:", response.data); // Log fetched data
      setStudents(response.data);
    } catch (error) {
      console.error("Error fetching student list:", error.message);
      setError('Failed to fetch student list. Please try again later.');
    }
  };

  return (
    <Box className="container">
      {error && (
        <Text color="red.500" mb={4}>
          {error}
        </Text>
      )}
      <Table className="table" id="makeEditable">
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Email</Th>
            <Th>Password</Th>
            <Th>Role</Th>
          </Tr>
        </Thead>
        <Tbody>
          {students.map((student) => (
            <Tr key={student._id}>
              <Td>{student.name}</Td>
              <Td>{student.email}</Td>
              <Td>{student.password}</Td>
              <Td>{student.role}</Td> {/* Uncomment if role is available */}
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default StudentList;
