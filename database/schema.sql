-- Fleet Management Database Schema

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS vehicles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  registration TEXT NOT NULL UNIQUE,
  make_model TEXT NOT NULL,
  manufacturer TEXT,
  license_disk_expiry DATE,
  insurance_expiry DATE,
  mileage INTEGER DEFAULT 0,
  status TEXT NOT NULL CHECK (status IN ('active', 'in_service', 'under_maintenance', 'out_of_service')),
  qr_code TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('admin', 'driver')),
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  phone TEXT,
  license_number TEXT,
  pdp_expiry DATE,
  assigned_vehicle_id UUID REFERENCES vehicles(id) ON DELETE SET NULL,
  rating NUMERIC(3,2) DEFAULT 0,
  status TEXT DEFAULT 'active',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS bookings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  invoice_number TEXT UNIQUE NOT NULL,
  customer_name TEXT NOT NULL,
  customer_phone TEXT,
  pickup_location TEXT NOT NULL,
  dropoff_location TEXT NOT NULL,
  start_time TIMESTAMPTZ NOT NULL,
  end_time TIMESTAMPTZ NOT NULL,
  driver_id UUID REFERENCES users(id) ON DELETE SET NULL,
  vehicle_id UUID REFERENCES vehicles(id) ON DELETE SET NULL,
  notes TEXT,
  status TEXT NOT NULL CHECK (status IN ('pending', 'confirmed', 'in_progress', 'completed', 'cancelled')) DEFAULT 'pending',
  amount NUMERIC(10,2) DEFAULT 0,
  created_by UUID REFERENCES users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS inspections (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  booking_id UUID REFERENCES bookings(id) ON DELETE SET NULL,
  vehicle_id UUID REFERENCES vehicles(id) ON DELETE SET NULL,
  driver_id UUID REFERENCES users(id) ON DELETE SET NULL,
  inspection_type TEXT NOT NULL CHECK (inspection_type IN ('pre_trip', 'post_trip', 'regular')),
  status TEXT NOT NULL CHECK (status IN ('pending', 'completed', 'requires_follow_up')) DEFAULT 'pending',
  defects JSONB DEFAULT '[]',
  comments TEXT,
  photos JSONB DEFAULT '[]',
  signature_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS incidents (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  reporter_id UUID REFERENCES users(id) ON DELETE SET NULL,
  vehicle_id UUID REFERENCES vehicles(id) ON DELETE SET NULL,
  booking_id UUID REFERENCES bookings(id) ON DELETE SET NULL,
  location TEXT,
  description TEXT,
  media_urls JSONB DEFAULT '[]',
  status TEXT NOT NULL CHECK (status IN ('open', 'under_review', 'resolved')) DEFAULT 'open',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS documents (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  owner_type TEXT NOT NULL,
  owner_id UUID,
  file_name TEXT NOT NULL,
  file_url TEXT NOT NULL,
  expiry_date DATE,
  uploaded_by UUID REFERENCES users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS notifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  type TEXT DEFAULT 'system',
  read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS audit_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  action TEXT NOT NULL,
  resource_type TEXT,
  resource_id UUID,
  details JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_bookings_start_time ON bookings(start_time);
CREATE INDEX IF NOT EXISTS idx_vehicles_status ON vehicles(status);
CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);
