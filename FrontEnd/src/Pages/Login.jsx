import React, { useContext, useState } from 'react';
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
} from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { NavLink, useNavigate } from 'react-router-dom';

import { AuthContext } from '../Context/AuthContextApi';

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const { setLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async () => {
    setError('');
    setLoading(true);

    try {
      const response = await fetch('https://university-dashboard-rurux.onrender.com/studentApi/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error('Login failed');
      }
      setLoggedIn({
        isAuth: true,
        token: data.accessToken
      });
      localStorage.setItem('accessToken', data.accessToken);
      localStorage.setItem('refreshToken', data.refreshToken);
      
      setSuccessMessage('Login successful! Redirecting to the dashboard...');
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      setError('Invalid email or password. Please try again.');
      console.error('Login error:', error.message);
    }

    setLoading(false);
  };

  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.900')}
    >
      <Stack spacing={4} mx={'auto'} width={"600px"} height={'500px'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'} textAlign={'center'} color={useColorModeValue('gray.800', 'white')}>
            Welcome Back
          </Heading>
          <Text fontSize={'lg'} color={'gray.500'}>
            Login to access your account
          </Text>
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}
        >
          <Stack spacing={4}>
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
                <InputRightElement h={'full'}>
                  <Button
                    variant={'ghost'}
                    onClick={() => setShowPassword((showPassword) => !showPassword)}
                  >
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            {error && (
              <Text color={'red.500'} fontSize={'sm'}>
                {error}
              </Text>
            )}
            {successMessage && (
              <Text color={'green.500'} fontSize={'sm'}>
                {successMessage}
              </Text>
            )}
            <Stack spacing={10} pt={2}>
              <Button
                isLoading={loading}
                loadingText="Logging in..."
                size="lg"
                bg={'teal.400'}
                color={'white'}
                _hover={{
                  bg: 'teal.500',
                }}
                onClick={handleLogin}
              >
                Login
              </Button>
            </Stack>
            <HStack pt={6}>
              <Divider />
              <Text align={'center'} fontSize={'sm'}>
                Not registered?{' '}
                <NavLink to="/signup" style={{ color: 'teal.400', fontWeight: 'bold' }}>
                  Sign up
                </NavLink>
              </Text>
              <Divider />
            </HStack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}

export default Login;
