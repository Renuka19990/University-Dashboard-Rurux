import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Flex, HStack, IconButton, useDisclosure, Stack, Button } from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';

const Navbar = ({ isAdmin, isStudent }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box bg="gray.100" px={4}>
      <Flex h={16} alignItems="center" justifyContent="space-between">
        <IconButton
          size="md"
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
          aria-label="Open Menu"
          display={{ md: 'none' }}
          onClick={isOpen ? onClose : onOpen}
        />
        <HStack spacing={8} alignItems="center">
          <Box as={Link} to="/">University Dashboard</Box>
          <HStack as="nav" spacing={4} display={{ base: 'none', md: 'flex' }}>
            {isAdmin && (
              <>
                <Button as={Link} to="/admin/dashboard">Dashboard</Button>
                <Button as={Link} to="/admin/logout">Logout</Button>
              </>
            )}
            {isStudent && (
              <>
                <Button as={Link} to="/student/profile">Profile</Button>
                <Button as={Link} to="/student/performance">Performance</Button>
                <Button as={Link} to="/student/logout">Logout</Button>
              </>
            )}
            {!isAdmin && !isStudent && (
              <>
                <Button as={Link} to="/student/login">Student Login</Button>
                <Button as={Link} to="/admin/login">Admin Login</Button>
              </>
            )}
          </HStack>
        </HStack>
        <Flex alignItems="center">
          <HStack spacing={4} display={{ base: 'none', md: 'flex' }}>
            {/* Additional items can be added here */}
          </HStack>
        </Flex>
      </Flex>

      {isOpen ? (
        <Box pb={4} display={{ md: 'none' }}>
          <Stack as="nav" spacing={4}>
            {isAdmin && (
              <>
                <Button as={Link} to="/admin/dashboard">Dashboard</Button>
                <Button as={Link} to="/admin/logout">Logout</Button>
              </>
            )}
            {isStudent && (
              <>
                <Button as={Link} to="/student/profile">Profile</Button>
                <Button as={Link} to="/student/performance">Performance</Button>
                <Button as={Link} to="/student/logout">Logout</Button>
              </>
            )}
            {!isAdmin && !isStudent && (
              <>
                <Button as={Link} to="/student/login">Student Login</Button>
                <Button as={Link} to="/admin/login">Admin Login</Button>
              </>
            )}
          </Stack>
        </Box>
      ) : null}
    </Box>
  );
};

export default Navbar;
