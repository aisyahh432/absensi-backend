import{ useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import LoginPage from "./pages/login";
import DashboardHome from "./pages/component/DashboardHome";
import DashboardLayout from "./pages/component/dashboard";
import DailyAttendance from "./pages/absensi/DailyAttendance";
import SummaryAttendance from "./pages/summary/summary-users";
import EmployeeDetails from "./pages/employee/EmployeeDetail";
import AdminDashboard from "./pages/admin/DashboardAdmin";
import EmployeeCreate from "./pages/employee/CreateEmployee"
import EmployeeEdit from "./pages/employee/EditEmployee"

import SummaryAdmin from"./pages/admin/SummaryAdmin"
import EmployeeData from "./pages/employee/index"

const ProtectedRoute = ({ children, allowedRoles }) => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  if (!token) return <Navigate to="/" replace />;
  if (allowedRoles && !allowedRoles.includes(role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

const PublicRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  if (token) {
    if (role === "admin") return <Navigate to="/admin-dashboard" replace />;
    if (role === "employee") return <Navigate to="/dashboard" replace />;
  }

  return children;
};

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  return (
    <Router>
      <Routes>
        {/* Login */}
        <Route
          path="/"
          element={
            <PublicRoute>
              <LoginPage setIsLoggedIn={setIsLoggedIn} />
            </PublicRoute>
          }
        />

        {/* Employee Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute allowedRoles={["employee"]}>
              <DashboardLayout setIsLoggedIn={setIsLoggedIn}>
                <DashboardHome />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/absensi"
          element={
            <ProtectedRoute allowedRoles={["employee"]}>
              <DashboardLayout setIsLoggedIn={setIsLoggedIn}>
                <DailyAttendance />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        {/* Admin Routes */}
        <Route
          path="/employee"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <DashboardLayout setIsLoggedIn={setIsLoggedIn}>
                <EmployeeDetails />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/summary"
          element={
            <ProtectedRoute allowedRoles={["admin","employee"]}>
              <DashboardLayout setIsLoggedIn={setIsLoggedIn}>
                <SummaryAttendance />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="admin-dashboard/employee/data"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminDashboard setIsLoggedIn={setIsLoggedIn}>
                <EmployeeData />
              </AdminDashboard>
            </ProtectedRoute>
          }
        />
         <Route
          path="admin-dashboard/employee/data/create"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminDashboard >
                <EmployeeCreate />
              </AdminDashboard>
            </ProtectedRoute>
          }
        />
          <Route
          path="/admin-dashboard/employee/data/edit/:nik"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminDashboard >
                <EmployeeEdit />
              </AdminDashboard>
            </ProtectedRoute>
          }
        />
         <Route
          path="/admin-dashboard/attendance/data"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminDashboard setIsLoggedIn={setIsLoggedIn}>
                <SummaryAdmin />
              </AdminDashboard>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin-dashboard"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
                <AdminDashboard setIsLoggedIn={setIsLoggedIn}>
                <DashboardHome />
                </AdminDashboard>
            </ProtectedRoute>
          }
        />

        {/* Fallback Routes */}
        <Route path="/unauthorized" element={<h3>Akses Ditolak</h3>} />
        <Route
          path="*"
          element={
            isLoggedIn ? (
              <Navigate
                to={
                  localStorage.getItem("role") === "admin"
                    ? "/admin-dashboard"
                    : "/dashboard"
                }
                replace
              />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
      </Routes>
    </Router>
  );
}
export default App;
