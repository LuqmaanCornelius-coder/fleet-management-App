const { query } = require('../config/db');

const getVehicles = async (req, res, next) => {
  try {
    const result = await query('SELECT * FROM vehicles ORDER BY created_at DESC');
    res.json({ vehicles: result.rows });
  } catch (err) {
    next(err);
  }
};

const getVehicleById = async (req, res, next) => {
  try {
    const result = await query('SELECT * FROM vehicles WHERE id = $1', [req.params.id]);
    res.json({ vehicle: result.rows[0] || null });
  } catch (err) {
    next(err);
  }
};

const createVehicle = async (req, res, next) => {
  try {
    const {
      registration,
      makeModel,
      licenseDiskExpiry,
      insuranceExpiry,
      mileage,
      status,
      manufacturer,
      notes
    } = req.body;
    const result = await query(
      `INSERT INTO vehicles (registration, make_model, manufacturer, license_disk_expiry, insurance_expiry, mileage, status, notes)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *`,
      [registration, makeModel, manufacturer, licenseDiskExpiry, insuranceExpiry, mileage || 0, status || 'active', notes]
    );
    res.status(201).json({ vehicle: result.rows[0] });
  } catch (err) {
    next(err);
  }
};

const updateVehicle = async (req, res, next) => {
  try {
    const {
      registration,
      makeModel,
      licenseDiskExpiry,
      insuranceExpiry,
      mileage,
      status,
      manufacturer,
      notes
    } = req.body;
    const result = await query(
      `UPDATE vehicles SET registration=$1, make_model=$2, manufacturer=$3, license_disk_expiry=$4, insurance_expiry=$5, mileage=$6, status=$7, notes=$8, updated_at=NOW()
       WHERE id=$9 RETURNING *`,
      [registration, makeModel, manufacturer, licenseDiskExpiry, insuranceExpiry, mileage || 0, status, notes, req.params.id]
    );
    res.json({ vehicle: result.rows[0] });
  } catch (err) {
    next(err);
  }
};

const deleteVehicle = async (req, res, next) => {
  try {
    await query('DELETE FROM vehicles WHERE id=$1', [req.params.id]);
    res.json({ message: 'Vehicle removed successfully' });
  } catch (err) {
    next(err);
  }
};

module.exports = { getVehicles, getVehicleById, createVehicle, updateVehicle, deleteVehicle };
