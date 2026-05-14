const { query } = require('../config/db');

const getInspections = async (req, res, next) => {
  try {
    const result = await query(`SELECT i.*, u.first_name AS driver_first, u.last_name AS driver_last, v.registration AS vehicle_registration
      FROM inspections i
      LEFT JOIN users u ON i.driver_id = u.id
      LEFT JOIN vehicles v ON i.vehicle_id = v.id
      ORDER BY i.created_at DESC`);
    res.json({ inspections: result.rows });
  } catch (err) {
    next(err);
  }
};

const getInspectionById = async (req, res, next) => {
  try {
    const result = await query('SELECT * FROM inspections WHERE id = $1', [req.params.id]);
    res.json({ inspection: result.rows[0] || null });
  } catch (err) {
    next(err);
  }
};

const getInspectionHistory = async (req, res, next) => {
  try {
    const result = await query('SELECT * FROM inspections ORDER BY created_at DESC LIMIT 40');
    res.json({ history: result.rows });
  } catch (err) {
    next(err);
  }
};

const createInspection = async (req, res, next) => {
  try {
    const { bookingId, vehicleId, inspectionType, status, defects, comments, photos, signatureUrl } = req.body;
    const result = await query(
      `INSERT INTO inspections (booking_id, vehicle_id, driver_id, inspection_type, status, defects, comments, photos, signature_url)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING *`,
      [bookingId, vehicleId, req.user.id, inspectionType || 'pre_trip', status || 'pending', defects || [], comments || '', photos || [], signatureUrl || null]
    );
    res.status(201).json({ inspection: result.rows[0] });
  } catch (err) {
    next(err);
  }
};

const updateInspection = async (req, res, next) => {
  try {
    const { status, defects, comments, photos, signatureUrl } = req.body;
    const result = await query(
      `UPDATE inspections SET status=$1, defects=$2, comments=$3, photos=$4, signature_url=$5, updated_at=NOW()
       WHERE id=$6 RETURNING *`,
      [status, defects || [], comments, photos || [], signatureUrl || null, req.params.id]
    );
    res.json({ inspection: result.rows[0] || null });
  } catch (err) {
    next(err);
  }
};

module.exports = { getInspections, getInspectionById, createInspection, updateInspection, getInspectionHistory };
