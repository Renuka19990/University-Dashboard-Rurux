import { useContext } from "react";
import { AuthContext } from "../Context/AuthContextApi";
import { Navigate } from "react-router-dom";


const PrivateRoute = ({Component }) => {
  const { isLoggedIn } = useContext(AuthContext);

  return isLoggedIn.isAuth ? <Component/> : <Navigate to="/login" />;
};

export default PrivateRoute;