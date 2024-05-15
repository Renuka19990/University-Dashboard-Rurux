import React, { useEffect, useState } from "react";
import { Table, Thead, Tbody, Tr, Th, Td, Box, Button } from "@chakra-ui/react";

const MarksPage = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    fetchStudentList();
  }, []);

  const fetchStudentList = async () => {
    try {
      const response = await fetch(
        "https://university-dashboard-rurux.onrender.com/adminApi/studentlist"
      );
      if (!response.ok) {
        throw new Error("Failed to fetch student list");
      }
      const data = await response.json();
      setStudents(data.students); // Assuming the response has a "students" key
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = (id) => {
    // Handle edit action, you can navigate to an edit page or open a modal
    console.log("Edit student with ID:", id);
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(
        `https://university-dashboard-rurux.onrender.com/admin/studentlist/${id}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error("Failed to delete student");
      }
      // Remove deleted student from the state
      setStudents(students.filter((student) => student._id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  const fetchMarks = async (id) => {
    try {
      const response = await fetch(
        `https://university-dashboard-rurux.onrender.com/admin/marks/${id}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch marks");
      }
      const marksData = await response.json();
      // Handle marks data
      console.log("Marks for student with ID", id, marksData);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box className="container">
      <Table className="table" id="makeEditable">
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Email</Th>
            <Th>Stream</Th>
            <Th>Subject</Th>
            <Th>Edit</Th>
            <Th>Delete</Th>
            <Th>Fetch Marks</Th>
          </Tr>
        </Thead>
        <Tbody>
          {students.map((student) => (
            <Tr key={student._id}>
              <Td>{student.name}</Td>
              <Td>{student.email}</Td>
              <Td>{student.stream ? student.stream.name : "-"}</Td>
              <Td>{student.subject ? student.subject.name : "-"}</Td>
              <Td>
                <Button onClick={() => handleEdit(student._id)}>Edit</Button>
              </Td>
              <Td>
                <Button onClick={() => handleDelete(student._id)}>Delete</Button>
              </Td>
              <Td>
                <Button onClick={() => fetchMarks(student._id)}>Fetch Marks</Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default MarksPage;
