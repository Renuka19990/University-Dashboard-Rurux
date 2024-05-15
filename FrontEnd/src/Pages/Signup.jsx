import React, { useState } from 'react';
import axios from 'axios';
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  VStack,
  HStack,
  Divider,
  useToast,
  Icon,
} from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { NavLink, useNavigate } from 'react-router-dom';
import { FaUserPlus } from 'react-icons/fa';

function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student'); // Assuming default role is student
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const toast = useToast();

  const handleSignup = async () => {
    setError('');
    setLoading(true);

    try {
      const response = await axios.post('https://university-dashboard-rurux.onrender.com/studentApi/register', {
        username,
        email,
        password,
        role,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status !== 201) {
        throw new Error('Signup failed');
      }

      toast({
        title: "Signup successful.",
        description: "You've successfully signed up. Redirecting to login page...",
        status: "success",
        duration: 2000,
        isClosable: true,
      });

      setTimeout(() => {
        navigate("/login");
      }, 2000);

      console.log('Signup successful');
    } catch (error) {
      const errorMessage = error.response ? error.response.data.message : error.message;
      setError(`Failed to sign up. ${errorMessage}`);
      console.error('Signup error:', errorMessage);
    }

    setLoading(false);
  };

  return (
    <Flex
      minH="100vh"
      align="center"
      justify="center"
      bg={useColorModeValue('gray.50', 'gray.800')}
  
    >
      <Stack spacing={8} mx="auto"  py={12} px={6} w="full" alignItems={"center"}>
        <Stack align="center">
          <Icon as={FaUserPlus} w={10} h={10} color="teal.400" />
          <Heading fontSize="4xl" textAlign="center">
            Sign up
          </Heading>
          <Text fontSize="lg" color="gray.600">
            Welcome
          </Text>
        </Stack>
        <Box
          rounded="lg"
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow="lg"
          p={8}
          width={["full", "md"]}
        >
          <Stack spacing={4}>
            <FormControl id="username" isRequired>
              <FormLabel>Username</FormLabel>
              <Input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                bg={useColorModeValue('gray.100', 'gray.600')}
                border={0}
                _focus={{
                  bg: useColorModeValue('gray.200', 'gray.500'),
                  borderColor: useColorModeValue('teal.400', 'teal.500'),
                }}
              />
            </FormControl>
            <FormControl id="email" isRequired>
              <FormLabel>Email address</FormLabel>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                bg={useColorModeValue('gray.100', 'gray.600')}
                border={0}
                _focus={{
                  bg: useColorModeValue('gray.200', 'gray.500'),
                  borderColor: useColorModeValue('teal.400', 'teal.500'),
                }}
              />
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  bg={useColorModeValue('gray.100', 'gray.600')}
                  border={0}
                  _focus={{
                    bg: useColorModeValue('gray.200', 'gray.500'),
                    borderColor: useColorModeValue('teal.400', 'teal.500'),
                  }}
                />
                <InputRightElement h="full">
                  <Button
                    variant="ghost"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            {error && (
              <Text color="red.500" fontSize="sm">
                {error}
              </Text>
            )}
            <Stack spacing={10} pt={2}>
              <Button
                isLoading={loading}
                loadingText="Signing up..."
                size="lg"
                bg="teal.400"
                color="white"
                _hover={{
                  bg: 'teal.500',
                }}
                onClick={handleSignup}
              >
                Sign up
              </Button>
            </Stack>
            <Flex pt={6}>
              <Text align="center" fontSize="sm">
                Already have an account?{' '}
                <Divider />
                <NavLink to="/login" style={{ color: 'teal.400', fontWeight: 'bold' }}>
                  Login
                </NavLink>
              </Text>
            </Flex>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}

export default Signup;
