import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Heading, Table, Thead, Tbody, Tr, Th, Td, TableContainer, Spinner, Alert, AlertIcon } from '@chakra-ui/react';

const StudentDashboard = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get('/api/student/list'); // Adjust the API endpoint if necessary
        setStudents(response.data.students);
      } catch (err) {
        setError('Failed to fetch students');
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <Spinner size="xl" />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <Alert status="error">
          <AlertIcon />
          {error}
        </Alert>
      </Box>
    );
  }

  return (
    <Box p={8}>
      <Heading as="h1" mb={6} textAlign="center">Student Dashboard</Heading>
      <TableContainer>
        <Table variant="striped" colorScheme="teal">
          <Thead>
            <Tr>
              <Th>ID</Th>
              <Th>Name</Th>
              <Th>Year</Th>
              <Th>Stream</Th>
            </Tr>
          </Thead>
          <Tbody>
            {students.map((student) => (
              <Tr key={student.id}>
                <Td>{student.id}</Td>
                <Td>{student.name}</Td>
                <Td>{student.year}</Td>
                <Td>{student.stream}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default StudentDashboard;
