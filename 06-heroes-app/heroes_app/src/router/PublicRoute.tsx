import { useContext } from "react";
import { AuthContext } from "../globals/context/AuthContext";
import { Navigate } from "react-router";

type PublicRouteProps = {
  children: React.ReactNode;
};

export const PublicRoute = ({ children }: PublicRouteProps) => {
  const { state } = useContext(AuthContext)!;
  return state.logged ? <Navigate to="/marvel" /> : <>{children}</>;
};
