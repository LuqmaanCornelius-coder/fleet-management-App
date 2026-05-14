import { useEffect, useState } from 'react';
import AdminLayout from '../../components/layout/AdminLayout';
import { Card, PageHeader, StatusBadge } from '../../components/ui/UiKit';
import { api } from '../../lib/api';
import { AreaChart, Area, ResponsiveContainer, Tooltip, CartesianGrid, XAxis, YAxis } from 'recharts';

const summary = [
  { label: 'Total bookings', value: 128 },
  { label: 'Active vehicles', value: 24 },
  { label: 'Available drivers', value: 16 },
  { label: 'Inspection alerts', value: 5 }
];

const chartData = [
  { day: 'Mon', revenue: 1200 },
  { day: 'Tue', revenue: 1850 },
  { day: 'Wed', revenue: 1520 },
  { day: 'Thu', revenue: 2180 },
  { day: 'Fri', revenue: 1980 },
  { day: 'Sat', revenue: 2400 },
  { day: 'Sun', revenue: 1860 }
];

const AdminDashboard = () => {
  const [metrics, setMetrics] = useState(null);

  useEffect(() => {
    api.get('/reports/dashboard').then((response) => setMetrics(response.data.metrics)).catch(console.error);
  }, []);

  return (
    <AdminLayout title="Dashboard">
      <PageHeader title="Command Center" subtitle="Real-time insights across bookings, fleet health, inspections, and driver activity." />
      <div className="grid gap-6 py-8 lg:grid-cols-2 xl:grid-cols-4">
        {summary.map((item) => (
          <Card key={item.label} className="bg-slate-900/90">
            <p className="text-sm font-medium uppercase tracking-[0.3em] text-slate-500">{item.label}</p>
            <p className="mt-4 text-4xl font-semibold text-white">{item.value}</p>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
        <Card title="Revenue Trend">
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 10, right: 0, left: -12, bottom: 0 }}>
                <defs>
                  <linearGradient id="energy" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#38bdf8" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#0f172a" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="day" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #334155' }} />
                <Area type="monotone" dataKey="revenue" stroke="#38bdf8" fill="url(#energy)" strokeWidth={3} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>
        <Card title="Quick Status">
          <div className="space-y-4">
            <div className="flex items-center justify-between gap-4 rounded-3xl bg-slate-950/80 p-4">
              <div>
                <h3 className="text-sm text-slate-400">Active Incidents</h3>
                <p className="text-2xl font-semibold text-white">3</p>
              </div>
              <StatusBadge status="open" />
            </div>
            <div className="flex items-center justify-between gap-4 rounded-3xl bg-slate-950/80 p-4">
              <div>
                <h3 className="text-sm text-slate-400">Vehicles Due</h3>
                <p className="text-2xl font-semibold text-white">4</p>
              </div>
              <StatusBadge status="under_maintenance" />
            </div>
            <div className="flex items-center justify-between gap-4 rounded-3xl bg-slate-950/80 p-4">
              <div>
                <h3 className="text-sm text-slate-400">Pending Bookings</h3>
                <p className="text-2xl font-semibold text-white">18</p>
              </div>
              <StatusBadge status="pending" />
            </div>
          </div>
        </Card>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <Card title="Vehicle Inspection Alerts">
          <ul className="space-y-4">
            <li className="rounded-3xl bg-slate-950/80 p-4">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="font-semibold text-white">Toyota Quantum — expiring license disk</p>
                  <p className="text-sm text-slate-400">License disk expires in 10 days.</p>
                </div>
                <StatusBadge status="under_maintenance" />
              </div>
            </li>
            <li className="rounded-3xl bg-slate-950/80 p-4">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="font-semibold text-white">Sprinter — overdue insurance</p>
                  <p className="text-sm text-slate-400">Insurance expires in 7 days.</p>
                </div>
                <StatusBadge status="pending" />
              </div>
            </li>
          </ul>
        </Card>
        <Card title="Driver Incident Feed">
          <ul className="space-y-4">
            <li className="rounded-3xl bg-slate-950/80 p-4">
              <p className="font-semibold text-white">Nia Dlamini</p>
              <p className="text-sm text-slate-400">Reported a scratch on a vehicle at the M1 service stop.</p>
            </li>
            <li className="rounded-3xl bg-slate-950/80 p-4">
              <p className="font-semibold text-white">Driver team</p>
              <p className="text-sm text-slate-400">New inspection report requires follow-up for pre-trip safety.</p>
            </li>
          </ul>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
