import { useEffect, useState } from 'react';
import AdminLayout from '../../components/layout/AdminLayout';
import { Card, PageHeader, StatusBadge } from '../../components/ui/UiKit';
import { api } from '../../lib/api';

const AdminDrivers = () => {
  const [drivers, setDrivers] = useState([]);

  useEffect(() => {
    api.get('/drivers').then((response) => setDrivers(response.data.drivers)).catch(console.error);
  }, []);

  return (
    <AdminLayout title="Drivers">
      <PageHeader title="Driver Management" subtitle="Manage licenses, PDP expiry, contact details, and assigned vehicles." />
      <div className="grid gap-6 lg:grid-cols-2">
        {drivers.map((driver) => (
          <Card key={driver.id} title={`${driver.first_name} ${driver.last_name}`} className="bg-slate-900/90">
            <div className="space-y-3 text-slate-300">
              <p><span className="font-semibold text-slate-100">Phone:</span> {driver.phone}</p>
              <p><span className="font-semibold text-slate-100">License:</span> {driver.license_number}</p>
              <p><span className="font-semibold text-slate-100">PDP expiry:</span> {driver.pdp_expiry?.slice(0, 10)}</p>
              <p><span className="font-semibold text-slate-100">Vehicle:</span> {driver.assigned_vehicle || 'Unassigned'}</p>
              <StatusBadge status={driver.status} />
            </div>
          </Card>
        ))}
      </div>
    </AdminLayout>
  );
};

export default AdminDrivers;
