const { query } = require('../config/db');

const getIncidents = async (req, res, next) => {
  try {
    const result = await query(`SELECT i.*, u.first_name AS driver_first, u.last_name AS driver_last, v.registration AS vehicle_registration
      FROM incidents i
      LEFT JOIN users u ON i.reporter_id = u.id
      LEFT JOIN vehicles v ON i.vehicle_id = v.id
      ORDER BY i.created_at DESC`);
    res.json({ incidents: result.rows });
  } catch (err) {
    next(err);
  }
};

const getIncidentById = async (req, res, next) => {
  try {
    const result = await query('SELECT * FROM incidents WHERE id = $1', [req.params.id]);
    res.json({ incident: result.rows[0] || null });
  } catch (err) {
    next(err);
  }
};

const createIncident = async (req, res, next) => {
  try {
    const { vehicleId, bookingId, location, description, mediaUrls } = req.body;
    const result = await query(
      `INSERT INTO incidents (reporter_id, vehicle_id, booking_id, location, description, media_urls)
       VALUES ($1,$2,$3,$4,$5,$6) RETURNING *`,
      [req.user.id, vehicleId, bookingId, location, description, mediaUrls || []]
    );
    res.status(201).json({ incident: result.rows[0] });
  } catch (err) {
    next(err);
  }
};

const updateIncidentStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    const result = await query(
      `UPDATE incidents SET status=$1, updated_at=NOW() WHERE id=$2 RETURNING *`,
      [status, req.params.id]
    );
    res.json({ incident: result.rows[0] || null });
  } catch (err) {
    next(err);
  }
};

module.exports = { getIncidents, getIncidentById, createIncident, updateIncidentStatus };
