import React, { useState } from 'react';
import axios from 'axios';
import { Box, Button, FormControl, FormLabel, Input, Heading, VStack, useToast } from '@chakra-ui/react';

const StudentLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const toast = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/student/login', { username, password });
      if (response.data.success) {
        toast({
          title: 'Login successful',
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error("Login failed", error);
      toast({
        title: 'Login failed',
        description: error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Box w="full" maxW="md" mx="auto" mt={10} p={8} borderWidth={1} borderRadius="lg" boxShadow="lg">
      <Heading as="h2" size="lg" mb={6} textAlign="center">Student Login</Heading>
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
          <Button type="submit" colorScheme="teal" size="lg" width="full">Login</Button>
        </VStack>
      </form>
    </Box>
  );
};

export default StudentLogin;
