import { useState } from 'react';
import AdminLayout from '../../components/layout/AdminLayout';
import { Card, PageHeader, Button } from '../../components/ui/UiKit';

const AdminSettings = () => {
  const [theme, setTheme] = useState('dark');
  return (
    <AdminLayout title="Settings">
      <PageHeader title="System Settings" subtitle="Configure portal preferences, branding, user permissions and notification options." />
      <Card>
        <div className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-3xl border border-slate-800 bg-slate-950/80 p-6">
              <h3 className="text-lg font-semibold text-white">Branding</h3>
              <p className="mt-2 text-slate-400">Update the logo, color palette and company name for tourism branding.</p>
            </div>
            <div className="rounded-3xl border border-slate-800 bg-slate-950/80 p-6">
              <h3 className="text-lg font-semibold text-white">Backup & Audit</h3>
              <p className="mt-2 text-slate-400">Schedule database backups and view audit logs for system security.</p>
            </div>
          </div>
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h3 className="text-lg font-semibold text-white">Theme mode</h3>
              <p className="text-slate-400">Switch between dark and light mode for faster dashboard readability.</p>
            </div>
            <Button variant="secondary" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
              {theme === 'dark' ? 'Switch to Light' : 'Switch to Dark'}
            </Button>
          </div>
        </div>
      </Card>
    </AdminLayout>
  );
};

export default AdminSettings;
