const { query } = require('../config/db');

const getDrivers = async (req, res, next) => {
  try {
    const result = await query(`SELECT u.*, v.registration AS assigned_vehicle
      FROM users u
      LEFT JOIN vehicles v ON u.assigned_vehicle_id = v.id
      WHERE u.role = 'driver' ORDER BY u.created_at DESC`);
    res.json({ drivers: result.rows });
  } catch (err) {
    next(err);
  }
};

const getDriverById = async (req, res, next) => {
  try {
    const result = await query('SELECT * FROM users WHERE id=$1 AND role = $2', [req.params.id, 'driver']);
    res.json({ driver: result.rows[0] || null });
  } catch (err) {
    next(err);
  }
};

const bcrypt = require('bcryptjs');

const createDriver = async (req, res, next) => {
  try {
    const {
      email,
      firstName,
      lastName,
      phone,
      licenseNumber,
      pdpExpiry,
      assignedVehicleId,
      status,
      password
    } = req.body;
    const passwordHash = bcrypt.hashSync(password || 'Driver123!', 10);
    const result = await query(
      `INSERT INTO users (email, role, first_name, last_name, phone, license_number, pdp_expiry, assigned_vehicle_id, status, password_hash)
       VALUES ($1, 'driver', $2, $3, $4, $5, $6, $7, $8, $9) RETURNING id, email, first_name, last_name, phone, status`,
      [email, firstName, lastName, phone, licenseNumber, pdpExpiry, assignedVehicleId, status || 'active', passwordHash]
    );
    res.status(201).json({ driver: result.rows[0] });
  } catch (err) {
    next(err);
  }
};

const updateDriver = async (req, res, next) => {
  try {
    const {
      firstName,
      lastName,
      phone,
      licenseNumber,
      pdpExpiry,
      assignedVehicleId,
      status
    } = req.body;
    const result = await query(
      `UPDATE users SET first_name=$1, last_name=$2, phone=$3, license_number=$4, pdp_expiry=$5, assigned_vehicle_id=$6, status=$7, updated_at=NOW()
       WHERE id=$8 AND role='driver' RETURNING id, email, first_name, last_name, phone, status`,
      [firstName, lastName, phone, licenseNumber, pdpExpiry, assignedVehicleId, status || 'active', req.params.id]
    );
    res.json({ driver: result.rows[0] });
  } catch (err) {
    next(err);
  }
};

const deleteDriver = async (req, res, next) => {
  try {
    await query('DELETE FROM users WHERE id=$1 AND role = $2', [req.params.id, 'driver']);
    res.json({ message: 'Driver profile deleted' });
  } catch (err) {
    next(err);
  }
};

module.exports = { getDrivers, getDriverById, createDriver, updateDriver, deleteDriver };
