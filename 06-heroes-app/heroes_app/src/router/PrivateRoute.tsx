import React, { useContext } from "react";
import { AuthContext } from "../globals/context/AuthContext";
import { Navigate } from "react-router";

type PrivateRouteProps = {
  children: React.ReactNode;
};

export const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const { state } = useContext(AuthContext)!;
  return state.logged ? <>{children}</> : <Navigate to="/login" />;
};
