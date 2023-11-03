import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import CustomSpinner from "../../Components/CustomSpinner/CustomSpinner";
import { AuthContext } from "../../Contexts/AuthProvider/AuthProvider";


const PrivateRoutes = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();
  
  if (loading) {
    return <CustomSpinner />;
  }
  if (user) {
    return children;
  }

  return (
    <Navigate to="/login" state={{ from: location }} replace>
      PrivateRoutes
    </Navigate>
  );
};

export default PrivateRoutes;
