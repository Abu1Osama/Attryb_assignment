import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

function PrivateRoute({ children }) {
  const location = useLocation();
  const isAuth = useSelector((state) => state.authReducer.isAuth);

  if (!isAuth) {
    // return <Navigate to="/signup" state={{ from: location.pathname }} replace={true} />;
    return  <Navigate state={location.pathname} to="/auth" replace />;
  }

  return children;
}

export default PrivateRoute;
