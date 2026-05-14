import { useState } from 'react';
import DriverLayout from '../../components/layout/DriverLayout';
import { Card, PageHeader, Button } from '../../components/ui/UiKit';

const goals = [
  { label: 'Brakes', checked: false },
  { label: 'Lights', checked: true },
  { label: 'Tires', checked: true },
  { label: 'Fluid levels', checked: false },
  { label: 'Safety equipment', checked: true }
];

const DriverInspections = () => {
  const [checkedItems, setCheckedItems] = useState(goals);

  const toggleItem = (index) => {
    setCheckedItems((prev) => prev.map((item, i) => (i === index ? { ...item, checked: !item.checked } : item)));
  };

  return (
    <DriverLayout title="Inspections">
      <PageHeader title="Vehicle Inspection" subtitle="Complete mobile inspection forms, upload photos, and report faults instantly." />
      <Card>
        <div className="space-y-4">
          {checkedItems.map((item, index) => (
            <label key={item.label} className="flex items-center gap-3 rounded-3xl border border-slate-800 bg-slate-950/80 p-4">
              <input type="checkbox" checked={item.checked} onChange={() => toggleItem(index)} className="h-5 w-5 rounded border-slate-700 bg-slate-900 text-cyan-400" />
              <span className="text-slate-100">{item.label}</span>
            </label>
          ))}
          <div className="grid gap-4 md:grid-cols-2">
            <Button>Upload Photos</Button>
            <Button variant="secondary">Report Fault</Button>
          </div>
        </div>
      </Card>
    </DriverLayout>
  );
};

export default DriverInspections;
