import { useEffect, useState } from 'react';
import DriverLayout from '../../components/layout/DriverLayout';
import { Card, PageHeader, Button, StatusBadge } from '../../components/ui/UiKit';
import { api } from '../../lib/api';

const DriverTrips = () => {
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    api.get('/bookings').then((response) => setTrips(response.data.bookings)).catch(console.error);
  }, []);

  return (
    <DriverLayout title="Trips">
      <PageHeader title="Trip Management" subtitle="Accept, update status, and navigate to each scheduled customer booking." />
      <div className="space-y-4">
        {trips.map((trip) => (
          <Card key={trip.id} className="bg-slate-900/90">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-xl font-semibold text-white">{trip.pickup_location} → {trip.dropoff_location}</p>
                <p className="text-sm text-slate-400">{new Date(trip.start_time).toLocaleString()} • {trip.customer_name}</p>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <StatusBadge status={trip.status} />
                <Button variant="secondary">Start</Button>
                <Button variant="primary">Complete</Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </DriverLayout>
  );
};

export default DriverTrips;
