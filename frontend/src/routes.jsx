import { Navigate, Route, Routes } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import AdminLogin from './pages/admin/Login';
import AdminDashboard from './pages/admin/Dashboard';
import AdminCalendar from './pages/admin/Calendar';
import AdminBookings from './pages/admin/Bookings';
import AdminVehicles from './pages/admin/Vehicles';
import AdminDrivers from './pages/admin/Drivers';
import AdminInspections from './pages/admin/Inspections';
import AdminIncidents from './pages/admin/Incidents';
import AdminReports from './pages/admin/Reports';
import AdminSettings from './pages/admin/Settings';
import DriverLogin from './pages/driver/Login';
import DriverDashboard from './pages/driver/Dashboard';
import DriverTrips from './pages/driver/Trips';
import DriverInspections from './pages/driver/Inspections';
import DriverIncidents from './pages/driver/Incidents';
import DriverProfile from './pages/driver/Profile';

const ProtectedRoute = ({ children, role, user }) => {
  if (!user) return <Navigate to={role === 'admin' ? '/admin/login' : '/driver/login'} replace />;
  if (role && user.role !== role) return <Navigate to={user.role === 'admin' ? '/admin/dashboard' : '/driver/dashboard'} replace />;
  return children;
};

export const AppRoutes = () => {
  const { user } = useAuth();

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/admin/login" replace />} />
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/driver/login" element={<DriverLogin />} />

      <Route
        path="/admin/dashboard"
        element={<ProtectedRoute user={user} role="admin"><AdminDashboard /></ProtectedRoute>}
      />
      <Route path="/admin/calendar" element={<ProtectedRoute user={user} role="admin"><AdminCalendar /></ProtectedRoute>} />
      <Route path="/admin/bookings" element={<ProtectedRoute user={user} role="admin"><AdminBookings /></ProtectedRoute>} />
      <Route path="/admin/vehicles" element={<ProtectedRoute user={user} role="admin"><AdminVehicles /></ProtectedRoute>} />
      <Route path="/admin/drivers" element={<ProtectedRoute user={user} role="admin"><AdminDrivers /></ProtectedRoute>} />
      <Route path="/admin/inspections" element={<ProtectedRoute user={user} role="admin"><AdminInspections /></ProtectedRoute>} />
      <Route path="/admin/incidents" element={<ProtectedRoute user={user} role="admin"><AdminIncidents /></ProtectedRoute>} />
      <Route path="/admin/reports" element={<ProtectedRoute user={user} role="admin"><AdminReports /></ProtectedRoute>} />
      <Route path="/admin/settings" element={<ProtectedRoute user={user} role="admin"><AdminSettings /></ProtectedRoute>} />

      <Route path="/driver/dashboard" element={<ProtectedRoute user={user} role="driver"><DriverDashboard /></ProtectedRoute>} />
      <Route path="/driver/trips" element={<ProtectedRoute user={user} role="driver"><DriverTrips /></ProtectedRoute>} />
      <Route path="/driver/inspections" element={<ProtectedRoute user={user} role="driver"><DriverInspections /></ProtectedRoute>} />
      <Route path="/driver/incidents" element={<ProtectedRoute user={user} role="driver"><DriverIncidents /></ProtectedRoute>} />
      <Route path="/driver/profile" element={<ProtectedRoute user={user} role="driver"><DriverProfile /></ProtectedRoute>} />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};
