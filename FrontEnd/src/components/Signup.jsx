import React, { useState } from 'react';
import axios from 'axios';
import { Box, Button, FormControl, FormLabel, Input, Heading, VStack, useToast } from '@chakra-ui/react';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [enrollmentDetails, setEnrollmentDetails] = useState({
    id: '',
    year: '',
    stream: ''
  });
  const toast = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/student/signup', { username, password, ...enrollmentDetails });
      if (response.data.success) {
        toast({
          title: 'Signup successful',
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error("Signup failed", error);
      toast({
        title: 'Signup failed',
        description: error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Box w="full" maxW="md" mx="auto" mt={10} p={8} borderWidth={1} borderRadius="lg" boxShadow="lg">
      <Heading as="h2" size="lg" mb={6} textAlign="center">Student Signup</Heading>
      <form onSubmit={handleSubmit}>
        <VStack spacing={4}>
          <FormControl id="username" isRequired>
            <FormLabel>Username</FormLabel>
            <Input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
          </FormControl>
          <FormControl id="password" isRequired>
            <FormLabel>Password</FormLabel>
            <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
          </FormControl>
          <FormControl id="id" isRequired>
            <FormLabel>ID</FormLabel>
            <Input type="text" value={enrollmentDetails.id} onChange={(e) => setEnrollmentDetails({ ...enrollmentDetails, id: e.target.value })} placeholder="ID" />
          </FormControl>
          <FormControl id="year" isRequired>
            <FormLabel>Year</FormLabel>
            <Input type="text" value={enrollmentDetails.year} onChange={(e) => setEnrollmentDetails({ ...enrollmentDetails, year: e.target.value })} placeholder="Year" />
          </FormControl>
          <FormControl id="stream" isRequired>
            <FormLabel>Stream</FormLabel>
            <Input type="text" value={enrollmentDetails.stream} onChange={(e) => setEnrollmentDetails({ ...enrollmentDetails, stream: e.target.value })} placeholder="Stream" />
          </FormControl>
          <Button type="submit" colorScheme="teal" size="lg" width="full">Signup</Button>
        </VStack>
      </form>
    </Box>
  );
};

export default Signup;
