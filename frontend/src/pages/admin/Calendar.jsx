import { useState } from 'react';
import AdminLayout from '../../components/layout/AdminLayout';
import { Card, PageHeader } from '../../components/ui/UiKit';

const sampleEvents = [
  { title: 'Airport Transfer', time: '09:00', driver: 'Nia Dlamini', vehicle: 'FXB 459 GP', status: 'confirmed' },
  { title: 'Safari Tour', time: '13:30', driver: 'Sizwe', vehicle: 'NDM 780 MP', status: 'pending' },
  { title: 'Corporate Meeting', time: '16:00', driver: 'Lerato', vehicle: 'FXB 459 GP', status: 'confirmed' }
];

const Calendar = () => {
  const [view, setView] = useState('weekly');

  return (
    <AdminLayout title="Calendar">
      <PageHeader title="Booking Calendar" subtitle="Track daily, weekly, and monthly trips with conflict detection." />
      <Card>
        <div className="flex flex-wrap items-center gap-3 pb-4">
          {['daily', 'weekly', 'monthly'].map((option) => (
            <button
              key={option}
              type="button"
              className={`rounded-2xl px-4 py-2 text-sm font-semibold ${view === option ? 'bg-sky-500 text-white' : 'bg-slate-800 text-slate-300'}`}
              onClick={() => setView(option)}
            >
              {option}
            </button>
          ))}
        </div>
        <div className="space-y-4">
          {sampleEvents.map((event) => (
            <div key={`${event.title}-${event.time}`} className="rounded-3xl bg-slate-950/80 p-5 border border-slate-800">
              <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-lg font-semibold text-white">{event.title}</p>
                  <p className="text-sm text-slate-400">{event.time} • {event.driver} • {event.vehicle}</p>
                </div>
                <span className="inline-flex rounded-full bg-sky-500/15 px-3 py-1 text-xs font-semibold text-sky-300">{event.status}</span>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </AdminLayout>
  );
};

export default Calendar;
