import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { ReactNode } from "react";

export const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();

  return (
    <>
      {user && children}
      {!user && <Navigate to="/" />}
    </>
  );
};

export default ProtectedRoute;
