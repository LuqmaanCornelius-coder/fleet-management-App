import { useEffect, useState } from 'react';
import DriverLayout from '../../components/layout/DriverLayout';
import { Card, PageHeader, Button } from '../../components/ui/UiKit';
import { api } from '../../lib/api';

const DriverProfile = () => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    api.get('/profile').then((response) => setProfile(response.data.profile)).catch(console.error);
  }, []);

  return (
    <DriverLayout title="Profile">
      <PageHeader title="Driver Profile" subtitle="View license expiry, contact details, assigned vehicle, and profile settings." />
      {profile ? (
        <Card className="bg-slate-900/90">
          <div className="space-y-4 text-slate-200">
            <div>
              <p className="text-sm text-slate-400">Name</p>
              <p className="text-lg font-semibold text-white">{profile.first_name} {profile.last_name}</p>
            </div>
            <div>
              <p className="text-sm text-slate-400">Email</p>
              <p>{profile.email}</p>
            </div>
            <div>
              <p className="text-sm text-slate-400">Phone</p>
              <p>{profile.phone}</p>
            </div>
            <div>
              <p className="text-sm text-slate-400">License / PDP expiry</p>
              <p>{profile.pdp_expiry?.slice(0, 10) || 'Not available'}</p>
            </div>
            <Button variant="secondary">Update contact info</Button>
          </div>
        </Card>
      ) : (
        <p className="text-slate-400">Loading profile...</p>
      )}
    </DriverLayout>
  );
};

export default DriverProfile;
