import { useEffect, useState } from 'react';
import DriverLayout from '../../components/layout/DriverLayout';
import { Card, PageHeader, Button } from '../../components/ui/UiKit';
import { api } from '../../lib/api';

const DriverIncidents = () => {
  const [incidents, setIncidents] = useState([]);

  useEffect(() => {
    api.get('/incidents').then((response) => setIncidents(response.data.incidents)).catch(console.error);
  }, []);

  return (
    <DriverLayout title="Incidents">
      <PageHeader title="Incident Reporting" subtitle="Submit accident reports, upload evidence, and access emergency contact tools." />
      <div className="space-y-4">
        <Button>Submit New Report</Button>
        {incidents.map((incident) => (
          <Card key={incident.id} className="bg-slate-900/90">
            <p className="font-semibold text-white">{incident.location}</p>
            <p className="text-sm text-slate-400">{incident.description}</p>
            <p className="mt-2 text-slate-300">Status: {incident.status}</p>
          </Card>
        ))}
      </div>
    </DriverLayout>
  );
};

export default DriverIncidents;
