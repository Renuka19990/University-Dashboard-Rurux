import React, { useContext } from "react";
import { Box, Flex } from "@chakra-ui/react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContextApi";

const Navbar = () => {
  const { isLoggedIn, setLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    setLoggedIn(false);
    alert("Logout successfully");
    navigate("/login");
  };

  return (
    <Flex
      as="nav"
      align="center"
      padding="1.5rem"
      bg="gray.500"
      color="white"
    >
      <Box mr="8px">University</Box>

      {isLoggedIn && (
        <Box
          display={{ base: "none", md: "flex" }}
          width={{ base: "full", md: "auto" }}
          alignItems="center"
          gap={30}
          fontSize={20}
          justifyContent={"space-between"}
        >
          <NavLink to="/studentlist" pr={4}>
            Students
          </NavLink>
          <NavLink to="/subject" pr={6}>
            Subjects
          </NavLink>
          <NavLink to="/marks" pr={4}>
            Marks
          </NavLink>
          <NavLink to="/stream" pr={4}>
            Streams
          </NavLink>
          <NavLink to="/" pr={4} onClick={handleLogout}>
            Logout
          </NavLink>
        </Box>
      )}

      {!isLoggedIn && (
        <Box
          display={{ base: "none", md: "flex" }}
          alignItems="center"
          gap={100}
          justifyContent="space-evenly"
        >
          <NavLink to="/login" mr={4}>
            Login
          </NavLink>
          <NavLink to="/signup" mr={4}>
            SignUp
          </NavLink>
        </Box>
      )}
    </Flex>
  );
};

export default Navbar;
