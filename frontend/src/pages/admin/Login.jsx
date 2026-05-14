import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../../components/ui/UiKit';

const AdminLogin = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('admin@fleetapp.test');
  const [password, setPassword] = useState('Admin123!');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError('');
    try {
      await login(email, password);
      navigate('/admin/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 px-4 py-12 text-slate-100 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-md rounded-3xl border border-slate-800 bg-slate-900/90 p-8 shadow-xl shadow-slate-950/40">
        <h1 className="text-3xl font-semibold">Admin Sign In</h1>
        <p className="mt-2 text-slate-400">Manage bookings, vehicles, drivers and safety from one portal.</p>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <label className="block text-sm font-medium text-slate-200">Email address</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              required
              className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none focus:border-sky-500"
            />
          </div>
          <div className="space-y-4">
            <label className="block text-sm font-medium text-slate-200">Password</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              required
              className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none focus:border-sky-500"
            />
          </div>
          {error && <p className="text-sm text-rose-400">{error}</p>}
          <Button type="submit" disabled={loading}>{loading ? 'Signing in...' : 'Sign in'}</Button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
