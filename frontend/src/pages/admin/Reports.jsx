import AdminLayout from '../../components/layout/AdminLayout';
import { Card, PageHeader } from '../../components/ui/UiKit';
import { AreaChart, Area, ResponsiveContainer, Tooltip, CartesianGrid, XAxis, YAxis } from 'recharts';

const performanceData = [
  { label: 'Week 1', bookings: 24, maintenance: 8 },
  { label: 'Week 2', bookings: 32, maintenance: 6 },
  { label: 'Week 3', bookings: 28, maintenance: 9 },
  { label: 'Week 4', bookings: 35, maintenance: 7 }
];

const AdminReports = () => (
  <AdminLayout title="Reports">
    <PageHeader title="Operational Reports" subtitle="Export revenue, driver performance, maintenance costs and usage analytics." />
    <div className="grid gap-6 xl:grid-cols-2">
      <Card title="Revenue & Bookings">
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={performanceData} margin={{ top: 10, right: 0, left: -12, bottom: 0 }}>
              <defs>
                <linearGradient id="revenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#38bdf8" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#0f172a" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="label" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <Tooltip contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #334155' }} />
              <Area type="monotone" dataKey="bookings" stroke="#38bdf8" fill="url(#revenue)" strokeWidth={3} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </Card>
      <Card title="Maintenance & Usage">
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={performanceData} margin={{ top: 10, right: 0, left: -12, bottom: 0 }}>
              <defs>
                <linearGradient id="maintenance" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#0f172a" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="label" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <Tooltip contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #334155' }} />
              <Area type="monotone" dataKey="maintenance" stroke="#f59e0b" fill="url(#maintenance)" strokeWidth={3} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  </AdminLayout>
);

export default AdminReports;
