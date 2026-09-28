import { Navigate, Route, Routes } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import ProtectedRoute from "./ProtectedRoute";
import Login from "../pages/Login/Login";
import SupervisorLayout from "../pages/supervisor/SupervisorLayout";
import Dashboard from "../pages/supervisor/Dashboard";
import Attendance from "../pages/supervisor/Attendance";
import AssignTasks from "../pages/supervisor/AssignTasks";
import Reports from "../pages/supervisor/Reports";
import WorkerLayout from "../pages/worker/WorkerLayout";
import Home from "../pages/worker/Home";
import MyTask from "../pages/worker/MyTask";
import HazardReport from "../pages/worker/HazardReport";
import HelpDesk from "../pages/worker/HelpDesk";
import SubmissionReport from "../pages/worker/SubmissionReport";

export default function AppRoutes() {
  const { user } = useAuth();

  const home = user
    ? user.role === "supervisor"
      ? "/supervisor/dashboard"
      : "/worker/home"
    : "/login";

  return (
    <Routes>
      <Route path="/login" element={user ? <Navigate to={home} replace /> : <Login />} />

      <Route element={<ProtectedRoute role="supervisor" />}>
        <Route path="/supervisor" element={<SupervisorLayout />}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="attendance" element={<Attendance />} />
          <Route path="tasks" element={<AssignTasks />} />
          <Route path="reports" element={<Reports />} />
        </Route>
      </Route>

      <Route element={<ProtectedRoute role="worker" />}>
        <Route path="/worker" element={<WorkerLayout />}>
          <Route index element={<Navigate to="home" replace />} />
          <Route path="home" element={<Home />} />
          <Route path="task" element={<MyTask />} />
          <Route path="hazard" element={<HazardReport />} />
          <Route path="help" element={<HelpDesk />} />
          <Route path="report" element={<SubmissionReport />} />
        </Route>
      </Route>

      <Route path="*" element={<Navigate to={home} replace />} />
    </Routes>
  );
}
