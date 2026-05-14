import { useEffect, useState } from 'react';
import AdminLayout from '../../components/layout/AdminLayout';
import { Card, PageHeader, StatusBadge } from '../../components/ui/UiKit';
import { api } from '../../lib/api';

const AdminIncidents = () => {
  const [incidents, setIncidents] = useState([]);

  useEffect(() => {
    api.get('/incidents').then((response) => setIncidents(response.data.incidents)).catch(console.error);
  }, []);

  return (
    <AdminLayout title="Incidents">
      <PageHeader title="Incident Reports" subtitle="Review driver-submitted incidents, upload evidence, and manage resolution workflows." />
      <div className="space-y-4">
        {incidents.map((incident) => (
          <Card key={incident.id} className="bg-slate-900/90">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="font-semibold text-white">{incident.location || 'Unknown location'}</p>
                <p className="text-sm text-slate-400">Reported by {incident.driver_first} {incident.driver_last}</p>
              </div>
              <StatusBadge status={incident.status} />
            </div>
            <p className="text-slate-300">{incident.description}</p>
          </Card>
        ))}
      </div>
    </AdminLayout>
  );
};

export default AdminIncidents;
