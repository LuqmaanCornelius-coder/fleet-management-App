import { useEffect, useState } from 'react';
import DriverLayout from '../../components/layout/DriverLayout';
import { Card, PageHeader, StatusBadge } from '../../components/ui/UiKit';
import { api } from '../../lib/api';
import { subscribeToNotifications } from '../../lib/socket';

const DriverDashboard = () => {
  const [notifications, setNotifications] = useState([]);
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    api.get('/bookings').then((response) => setTrips(response.data.bookings.slice(0, 3))).catch(console.error);
    subscribeToNotifications((payload) => setNotifications((prev) => [payload, ...prev].slice(0, 5)));
  }, []);

  return (
    <DriverLayout title="Dashboard">
      <PageHeader title="Field Operations" subtitle="Keep your daily schedule, upcoming trips, and alerts visible at all times." />
      <div className="grid gap-6 xl:grid-cols-3">
        <Card className="bg-slate-900/90">
          <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Upcoming Trips</p>
          <p className="mt-4 text-4xl font-semibold text-white">{trips.length}</p>
        </Card>
        <Card className="bg-slate-900/90">
          <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Assigned Vehicle</p>
          <p className="mt-4 text-4xl font-semibold text-white">FXB 459 GP</p>
        </Card>
        <Card className="bg-slate-900/90">
          <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Inspection Alerts</p>
          <p className="mt-4 text-4xl font-semibold text-white">2</p>
        </Card>
      </div>
      <div className="grid gap-6 xl:grid-cols-2 mt-6">
        <Card title="Today’s Schedule">
          <ul className="space-y-4">
            {trips.map((trip) => (
              <li key={trip.id} className="rounded-3xl border border-slate-800 bg-slate-950/80 p-4">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="font-semibold text-white">{trip.pickup_location} → {trip.dropoff_location}</p>
                    <p className="text-sm text-slate-400">{new Date(trip.start_time).toLocaleString()}</p>
                  </div>
                  <StatusBadge status={trip.status} />
                </div>
              </li>
            ))}
          </ul>
        </Card>
        <Card title="Notifications">
          <div className="space-y-3">
            {notifications.length ? notifications.map((note, index) => (
              <div key={index} className="rounded-3xl bg-slate-950/80 p-4">
                <p className="font-semibold text-white">{note.title}</p>
                <p className="text-sm text-slate-400">{note.message}</p>
              </div>
            )) : <p className="text-slate-400">No notifications yet.</p>}
          </div>
        </Card>
      </div>
    </DriverLayout>
  );
};

export default DriverDashboard;
