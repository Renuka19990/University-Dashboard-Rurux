import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const PrivateRoute = ({ element: Component, ...rest }) => (
  <Route
    {...rest}
    element={() => {
      const token = localStorage.getItem('token');
      if (!token) {
        return <Navigate to="/student/login" />;
      }
      return <Component />;
    }}
  />
);

export default PrivateRoute;

