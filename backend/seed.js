const bcrypt = require('bcryptjs');
const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config();

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

const seed = async () => {
  const adminPassword = bcrypt.hashSync('Admin123!', 10);
  const driverPassword = bcrypt.hashSync('Driver123!', 10);

  await pool.query(`INSERT INTO users (email, password_hash, role, first_name, last_name, phone, status) VALUES
    ('admin@fleetapp.test', $1, 'admin', 'Alex', 'Morgan', '+27123456789', 'active') ON CONFLICT (email) DO NOTHING;`, [adminPassword]);

  await pool.query(`INSERT INTO users (email, password_hash, role, first_name, last_name, phone, license_number, pdp_expiry, status) VALUES
    ('driver@fleetapp.test', $1, 'driver', 'Nia', 'Dlamini', '+27119876543', 'DL-952193', CURRENT_DATE + INTERVAL '320 days', 'active') ON CONFLICT (email) DO NOTHING;`, [driverPassword]);

  await pool.query(`INSERT INTO vehicles (registration, make_model, manufacturer, license_disk_expiry, insurance_expiry, mileage, status, qr_code, notes) VALUES
    ('FXB 459 GP', 'Toyota Quantum', 'Toyota', CURRENT_DATE + INTERVAL '120 days', CURRENT_DATE + INTERVAL '90 days', 182350, 'active', 'QR-VEHICLE-01', '16-seater tourism shuttle'),
    ('NDM 780 MP', 'Mercedes Sprinter', 'Mercedes-Benz', CURRENT_DATE + INTERVAL '75 days', CURRENT_DATE + INTERVAL '45 days', 124800, 'in_service', 'QR-VEHICLE-02', 'Luxury airport transfer van')
    ON CONFLICT (registration) DO NOTHING;`);

  await pool.query(`INSERT INTO bookings (invoice_number, customer_name, customer_phone, pickup_location, dropoff_location, start_time, end_time, driver_id, vehicle_id, notes, status, amount, created_by)
    SELECT 'INV-2026-001', 'Lungile Jacobs', '+27109876543', 'Sandton City Mall', 'O.R. Tambo Airport', CURRENT_TIMESTAMP + INTERVAL '2 days', CURRENT_TIMESTAMP + INTERVAL '2 days 2 hours', d.id, v.id, 'VIP transfer with luggage assistance', 'confirmed', 1250.00, a.id
    FROM users d, users a, vehicles v
    WHERE d.role='driver' AND a.role='admin' AND v.registration='FXB 459 GP'
    LIMIT 1 ON CONFLICT (invoice_number) DO NOTHING;`);

  await pool.query(`INSERT INTO inspections (booking_id, vehicle_id, driver_id, inspection_type, status, defects, comments, photos, signature_url) VALUES
    ((SELECT id FROM bookings WHERE invoice_number = 'INV-2026-001'), (SELECT id FROM vehicles WHERE registration = 'FXB 459 GP'), (SELECT id FROM users WHERE email = 'driver@fleetapp.test'), 'pre_trip', 'completed', '[]', 'Tires and brakes in good condition.', '[]', NULL)
    ON CONFLICT DO NOTHING;`);

  await pool.query(`INSERT INTO incidents (reporter_id, vehicle_id, booking_id, location, description, media_urls, status) VALUES
    ((SELECT id FROM users WHERE email = 'driver@fleetapp.test'), (SELECT id FROM vehicles WHERE registration = 'FXB 459 GP'), (SELECT id FROM bookings WHERE invoice_number = 'INV-2026-001'), 'M1 Highway', 'Light scratch on rear bumper during roadside stop.', '[]', 'open')
    ON CONFLICT DO NOTHING;`);

  await pool.query(`INSERT INTO documents (owner_type, owner_id, file_name, file_url, uploaded_by) VALUES
    ('vehicle', (SELECT id FROM vehicles WHERE registration = 'FXB 459 GP'), 'license-quantum.pdf', '/uploads/license-quantum.pdf', (SELECT id FROM users WHERE email = 'admin@fleetapp.test'))
    ON CONFLICT DO NOTHING;`);

  console.log('Seed data inserted.');
  await pool.end();
};

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
