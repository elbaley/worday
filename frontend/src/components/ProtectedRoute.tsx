import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { ReactNode } from "react";

export const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();

  return (
    <>
      {/* If the user is authenticated, render the contents of the 'children' prop */}
      {user && children}
      {/* If the user is not authenticated, redirect them to the home page */}
      {!user && <Navigate to="/" />}
    </>
  );
};

export default ProtectedRoute;
