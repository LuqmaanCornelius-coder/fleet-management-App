import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const driverNav = [
  { to: '/driver/dashboard', label: 'Dashboard' },
  { to: '/driver/trips', label: 'Trips' },
  { to: '/driver/inspections', label: 'Inspections' },
  { to: '/driver/incidents', label: 'Incidents' },
  { to: '/driver/profile', label: 'Profile' }
];

const DriverLayout = ({ title, children }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr]">
        <aside className="border-r border-slate-800 bg-slate-950/95 p-6">
          <div className="mb-10">
            <h2 className="text-2xl font-semibold text-white">Driver Portal</h2>
            <p className="mt-2 text-sm text-slate-400">Field operations</p>
          </div>
          <div className="space-y-1">
            {driverNav.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `block rounded-2xl px-4 py-3 text-sm font-medium ${isActive ? 'bg-slate-800 text-white' : 'text-slate-300 hover:bg-slate-900'}`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </div>
          <div className="mt-10 rounded-3xl bg-slate-900 p-5 text-sm text-slate-300">
            <p className="font-semibold text-white">Driver</p>
            <p>{user?.firstName} {user?.lastName}</p>
            <p className="mt-2 text-slate-500">{user?.email}</p>
          </div>
          <button
            type="button"
            onClick={() => { logout(); navigate('/driver/login'); }}
            className="mt-6 w-full rounded-2xl bg-rose-500 px-4 py-3 text-sm font-semibold text-white hover:bg-rose-400"
          >Sign out</button>
        </aside>
        <main className="p-6">
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.32em] text-cyan-400">Driver Portal</p>
              <h1 className="text-3xl font-semibold text-white">{title || 'Dashboard'}</h1>
            </div>
          </div>
          {children}
        </main>
      </div>
    </div>
  );
};

export default DriverLayout;
