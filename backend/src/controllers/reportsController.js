const { query } = require('../config/db');

const getReportMetrics = async (req, res, next) => {
  try {
    const bookings = await query('SELECT COUNT(*)::int AS total_bookings, SUM(CASE WHEN status = $1 THEN 1 ELSE 0 END)::int AS completed_bookings, SUM(amount)::numeric AS revenue FROM bookings', ['completed']);
    const vehicles = await query('SELECT COUNT(*)::int AS total_vehicles, SUM(CASE WHEN status = $1 THEN 1 ELSE 0 END)::int AS in_service FROM vehicles', ['in_service']);
    const drivers = await query('SELECT COUNT(*)::int AS total_drivers, AVG(rating)::numeric(10,2) AS avg_rating FROM users WHERE role = $1', ['driver']);
    const incidents = await query('SELECT COUNT(*)::int AS total_incidents, SUM(CASE WHEN status = $1 THEN 1 ELSE 0 END)::int AS open_incidents FROM incidents', ['open']);

    res.json({
      metrics: {
        bookings: bookings.rows[0],
        vehicles: vehicles.rows[0],
        drivers: drivers.rows[0],
        incidents: incidents.rows[0]
      }
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { getReportMetrics };
