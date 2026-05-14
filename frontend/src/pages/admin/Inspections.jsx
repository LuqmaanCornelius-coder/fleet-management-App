import { useEffect, useState } from 'react';
import AdminLayout from '../../components/layout/AdminLayout';
import { Card, PageHeader, StatusBadge } from '../../components/ui/UiKit';
import { api } from '../../lib/api';

const AdminInspections = () => {
  const [inspections, setInspections] = useState([]);

  useEffect(() => {
    api.get('/inspections').then((response) => setInspections(response.data.inspections)).catch(console.error);
  }, []);

  return (
    <AdminLayout title="Inspections">
      <PageHeader title="Vehicle Inspections" subtitle="Complete pre-trip and post-trip digital forms, upload photos, and review defect reports." />
      <div className="space-y-4">
        {inspections.map((inspection) => (
          <Card key={inspection.id} className="bg-slate-900/90">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="font-semibold text-white">{inspection.inspection_type.replace('_', ' ')} inspection</p>
                <p className="text-sm text-slate-400">Driver: {inspection.driver_first} {inspection.driver_last} • Vehicle: {inspection.vehicle_registration}</p>
              </div>
              <StatusBadge status={inspection.status} />
            </div>
            <p className="text-slate-300">{inspection.comments || 'No comments available.'}</p>
          </Card>
        ))}
      </div>
    </AdminLayout>
  );
};

export default AdminInspections;
