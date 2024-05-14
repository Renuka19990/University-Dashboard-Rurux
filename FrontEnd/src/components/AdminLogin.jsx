import React, { useState } from 'react';
import axios from 'axios';

const AdminLogin = ({ setAdminLoggedIn }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/admin/login', { username, password });
      if (response.data.success) {
        setAdminLoggedIn(true);
      }
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Admin Login</h2>
      <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
      <button type="submit">Login</button>
    </form>
  );
};

export default AdminLogin;
