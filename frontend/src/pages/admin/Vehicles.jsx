import { useEffect, useState } from 'react';
import AdminLayout from '../../components/layout/AdminLayout';
import { Card, PageHeader, StatusBadge } from '../../components/ui/UiKit';
import { api } from '../../lib/api';

const AdminVehicles = () => {
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    api.get('/vehicles').then((response) => setVehicles(response.data.vehicles)).catch(console.error);
  }, []);

  return (
    <AdminLayout title="Vehicles">
      <PageHeader title="Fleet Management" subtitle="Track licence expiry, maintenance reminders and vehicle health." />
      <div className="grid gap-6 lg:grid-cols-2">
        {vehicles.map((vehicle) => (
          <Card key={vehicle.id} title={vehicle.registration} className="bg-slate-900/90">
            <div className="space-y-3 text-slate-300">
              <p><span className="font-semibold text-slate-100">Model:</span> {vehicle.make_model}</p>
              <p><span className="font-semibold text-slate-100">Mileage:</span> {vehicle.mileage} km</p>
              <p><span className="font-semibold text-slate-100">License expiry:</span> {vehicle.license_disk_expiry?.slice(0, 10)}</p>
              <p><span className="font-semibold text-slate-100">Insurance expiry:</span> {vehicle.insurance_expiry?.slice(0, 10)}</p>
              <StatusBadge status={vehicle.status} />
            </div>
          </Card>
        ))}
      </div>
    </AdminLayout>
  );
};

export default AdminVehicles;
