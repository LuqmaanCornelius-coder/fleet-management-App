-- Example seed data for fleet management platform

INSERT INTO users (email, password_hash, role, first_name, last_name, phone, status)
VALUES
  ('admin@fleetapp.test', '$2a$10$ADMIN_PASSWORD_HASH_PLACEHOLDER', 'admin', 'Alex', 'Morgan', '+27123456789', 'active')
  ON CONFLICT (email) DO NOTHING;

INSERT INTO users (email, password_hash, role, first_name, last_name, phone, license_number, pdp_expiry, status)
VALUES
  ('driver@fleetapp.test', '$2a$10$DRIVER_PASSWORD_HASH_PLACEHOLDER', 'driver', 'Nia', 'Dlamini', '+27119876543', 'DL-952193', CURRENT_DATE + INTERVAL '320 days', 'active')
  ON CONFLICT (email) DO NOTHING;

INSERT INTO vehicles (registration, make_model, manufacturer, license_disk_expiry, insurance_expiry, mileage, status, qr_code, notes)
VALUES
  ('FXB 459 GP', 'Toyota Quantum', 'Toyota', CURRENT_DATE + INTERVAL '120 days', CURRENT_DATE + INTERVAL '90 days', 182350, 'active', 'QR-VEHICLE-01', '16-seater tourism shuttle'),
  ('NDM 780 MP', 'Mercedes Sprinter', 'Mercedes-Benz', CURRENT_DATE + INTERVAL '75 days', CURRENT_DATE + INTERVAL '45 days', 124800, 'in_service', 'QR-VEHICLE-02', 'Luxury airport transfer van')
  ON CONFLICT (registration) DO NOTHING;

-- Add sample booking, inspection, incident and documents from the backend seed script.
