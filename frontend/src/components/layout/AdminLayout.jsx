import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const adminNav = [
  { to: '/admin/dashboard', label: 'Dashboard' },
  { to: '/admin/calendar', label: 'Calendar' },
  { to: '/admin/bookings', label: 'Bookings' },
  { to: '/admin/vehicles', label: 'Vehicles' },
  { to: '/admin/drivers', label: 'Drivers' },
  { to: '/admin/inspections', label: 'Inspections' },
  { to: '/admin/incidents', label: 'Incidents' },
  { to: '/admin/reports', label: 'Reports' },
  { to: '/admin/settings', label: 'Settings' }
];

const NavItem = ({ to, label }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `block rounded-2xl px-4 py-3 text-sm font-medium ${isActive ? 'bg-slate-800 text-white' : 'text-slate-300 hover:bg-slate-900'}`
    }
  >
    {label}
  </NavLink>
);

const AdminLayout = ({ title, children }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr]">
        <aside className="border-r border-slate-800 bg-slate-950/95 p-6">
          <div className="mb-10">
            <h2 className="text-2xl font-semibold text-white">Fleet Admin</h2>
            <p className="mt-2 text-sm text-slate-400">Enterprise control center</p>
          </div>
          <div className="space-y-1">
            {adminNav.map((item) => <NavItem key={item.to} {...item} />)}
          </div>
          <div className="mt-10 rounded-3xl bg-slate-900 p-5 text-sm text-slate-300">
            <p className="font-semibold text-white">Signed in as</p>
            <p>{user?.firstName} {user?.lastName}</p>
            <p className="mt-2 text-slate-500">{user?.email}</p>
          </div>
          <button
            type="button"
            onClick={() => { logout(); navigate('/admin/login'); }}
            className="mt-6 w-full rounded-2xl bg-rose-500 px-4 py-3 text-sm font-semibold text-white hover:bg-rose-400"
          >Sign out</button>
        </aside>
        <main className="p-6">
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.32em] text-cyan-400">Admin Portal</p>
              <h1 className="text-3xl font-semibold text-white">{title || 'Dashboard'}</h1>
            </div>
          </div>
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
