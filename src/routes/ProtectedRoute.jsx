import { Navigate, Outlet } from "react-router-dom";
import { useCurrentUser } from "../features/auth/services/index";

const ProtectedRoute = ({ allowedRole }) => {
  const { data, isLoading } = useCurrentUser();

  const user = data?.user;

  // while loading user
  if (isLoading) return null;

  // not logged in
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // role check
  if (allowedRole && user.role !== allowedRole) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
