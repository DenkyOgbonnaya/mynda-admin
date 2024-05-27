import React, { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { getAccessToken } from "utills/appStorage";

interface AuthProtectedProps {
  children: ReactNode;
}

const AuthProtected: React.FC<AuthProtectedProps> = ({ children }) => {
  const accessToken = getAccessToken()
  if (!accessToken) {
    return <Navigate to={{ pathname: "/login" }} />;
  }

  return <React.Fragment>{children}</React.Fragment>;
};

export default AuthProtected;
