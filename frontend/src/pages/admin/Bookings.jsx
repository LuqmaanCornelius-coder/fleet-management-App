import { useEffect, useState } from 'react';
import AdminLayout from '../../components/layout/AdminLayout';
import { Card, PageHeader, StatusBadge } from '../../components/ui/UiKit';
import { api } from '../../lib/api';

const AdminBookings = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    api.get('/bookings').then((response) => setBookings(response.data.bookings)).catch(console.error);
  }, []);

  return (
    <AdminLayout title="Bookings">
      <PageHeader title="Booking Management" subtitle="Create, reschedule, assign drivers and vehicles, and keep every trip on track." />
      <Card>
        <div className="overflow-x-auto rounded-3xl border border-slate-800 bg-slate-950/80 p-4">
          <table className="min-w-full text-left text-sm text-slate-200">
            <thead className="border-b border-slate-800 text-slate-400">
              <tr>
                <th className="px-4 py-3">Invoice</th>
                <th className="px-4 py-3">Customer</th>
                <th className="px-4 py-3">Route</th>
                <th className="px-4 py-3">Schedule</th>
                <th className="px-4 py-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {bookings.map((booking) => (
                <tr key={booking.id}>
                  <td className="px-4 py-4">{booking.invoice_number}</td>
                  <td className="px-4 py-4">{booking.customer_name}</td>
                  <td className="px-4 py-4">{booking.pickup_location} → {booking.dropoff_location}</td>
                  <td className="px-4 py-4">{new Date(booking.start_time).toLocaleString()}</td>
                  <td className="px-4 py-4"><StatusBadge status={booking.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </AdminLayout>
  );
};

export default AdminBookings;
