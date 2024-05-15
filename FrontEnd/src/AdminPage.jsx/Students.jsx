import React, { useEffect, useState } from "react";
import axios from 'axios';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Box,
  Text,
  Spinner,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  VStack,
  HStack,
  Avatar,
} from "@chakra-ui/react";

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchStudentList();
  }, []);

  const fetchStudentList = async () => {
    try {
      const response = await axios.get("https://university-dashboard-rurux.onrender.com/adminApi/studentlist", {
        withCredentials: true,
      });
      setStudents(response.data);
    } catch (error) {
      console.error("Error fetching student list:", error.message);
      setError('Failed to fetch student list. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      maxW="1200px"
      mx="auto"
      p={4}
      bg="white"
      boxShadow="md"
      borderRadius="md"
      mt={10}
    >
      {loading ? (
        <VStack spacing={4}>
          <Spinner size="xl" />
          <Text>Loading student list...</Text>
        </VStack>
      ) : error ? (
        <Alert status="error">
          <AlertIcon />
          <AlertTitle>Error!</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      ) : (
        <>
          <Text fontSize="2xl" mb={6} textAlign="center" fontWeight="bold">
            Student List
          </Text>
          <Table variant="striped" colorScheme="teal">
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
                  <Td>
                    <HStack spacing={3}>
                      <Avatar name={student.username} size="sm" />
                      <Text>{student.username}</Text>
                    </HStack>
                  </Td>
                  <Td>{student.email}</Td>
                  <Td>{student.password}</Td>
                  <Td>{student.role}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </>
      )}
    </Box>
  );
};

export default StudentList;
