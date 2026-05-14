import { Link } from 'react-router-dom';

export const Container = ({ children, className = '' }) => (
  <div className={`max-w-full mx-auto px-4 sm:px-6 lg:px-8 ${className}`}>{children}</div>
);

export const PageHeader = ({ title, subtitle, action }) => (
  <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
    <div>
      <p className="text-sm uppercase tracking-[0.25em] text-cyan-400">Fleet Control</p>
      <h1 className="text-3xl font-semibold text-slate-100">{title}</h1>
      {subtitle && <p className="mt-2 text-slate-400 max-w-2xl">{subtitle}</p>}
    </div>
    {action && <div>{action}</div>}
  </div>
);

export const Card = ({ title, children, className = '' }) => (
  <section className={`rounded-3xl border border-slate-800 bg-slate-900/80 p-6 shadow-lg shadow-slate-950/20 ${className}`}>
    {title && <h2 className="text-xl font-semibold text-slate-100 mb-4">{title}</h2>}
    {children}
  </section>
);

export const Button = ({ children, variant = 'primary', ...props }) => {
  const base = 'inline-flex items-center justify-center rounded-2xl px-5 py-2.5 text-sm font-semibold transition';
  const styles = {
    primary: 'bg-sky-500 text-white hover:bg-sky-400',
    secondary: 'bg-slate-800 text-slate-100 border border-slate-700 hover:bg-slate-700',
    danger: 'bg-rose-500 text-white hover:bg-rose-400'
  };
  return <button className={`${base} ${styles[variant] || styles.primary}`} {...props}>{children}</button>;
};

export const StatusBadge = ({ status }) => {
  const map = {
    pending: 'bg-amber-500/15 text-amber-300',
    confirmed: 'bg-sky-500/15 text-sky-300',
    completed: 'bg-emerald-500/15 text-emerald-300',
    in_progress: 'bg-indigo-500/15 text-indigo-300',
    cancelled: 'bg-rose-500/15 text-rose-300',
    open: 'bg-rose-500/15 text-rose-300',
    active: 'bg-emerald-500/15 text-emerald-300',
    in_service: 'bg-amber-500/15 text-amber-300',
    under_maintenance: 'bg-orange-500/15 text-orange-300',
    out_of_service: 'bg-slate-500/15 text-slate-300'
  };
  return <span className={`rounded-full px-3 py-1 text-xs font-semibold ${map[status] || 'bg-slate-700 text-slate-100'}`}>{status.replace('_', ' ')}</span>;
};

export const SidebarLink = ({ to, label }) => (
  <Link className="block rounded-2xl px-4 py-3 text-sm font-medium text-slate-200 hover:bg-slate-800" to={to}>{label}</Link>
);
