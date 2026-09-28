import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Loading from "../components/Loading";

export default function ProtectedRoute({ role }) {
  const { user } = useAuth();

  if (user === undefined) return <Loading label="Checking session" />;
  if (!user) return <Navigate to="/login" replace />;
  if (role && user.role !== role) {
    return <Navigate to={user.role === "supervisor" ? "/supervisor/dashboard" : "/worker/home"} replace />;
  }

  return <Outlet />;
}
