const { query } = require('../config/db');
const { broadcastNotification } = require('../services/socketService');

const getBookings = async (req, res, next) => {
  try {
    const baseQuery = `SELECT b.*, d.first_name AS driver_first, d.last_name AS driver_last, v.registration AS vehicle_registration
      FROM bookings b
      LEFT JOIN users d ON b.driver_id = d.id
      LEFT JOIN vehicles v ON b.vehicle_id = v.id
      ORDER BY b.start_time DESC`;
    const result = await query(baseQuery);
    res.json({ bookings: result.rows });
  } catch (err) {
    next(err);
  }
};

const getBookingById = async (req, res, next) => {
  try {
    const result = await query('SELECT * FROM bookings WHERE id = $1', [req.params.id]);
    res.json({ booking: result.rows[0] || null });
  } catch (err) {
    next(err);
  }
};

const createBooking = async (req, res, next) => {
  try {
    const {
      invoiceNumber,
      customerName,
      customerPhone,
      pickupLocation,
      dropoffLocation,
      startTime,
      endTime,
      driverId,
      vehicleId,
      notes,
      status
    } = req.body;

    const result = await query(
      `INSERT INTO bookings (invoice_number, customer_name, customer_phone, pickup_location, dropoff_location, start_time, end_time, driver_id, vehicle_id, notes, status, created_by)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12) RETURNING *`,
      [invoiceNumber, customerName, customerPhone, pickupLocation, dropoffLocation, startTime, endTime, driverId, vehicleId, notes, status || 'pending', req.user.id]
    );

    broadcastNotification({
      title: 'New booking created',
      message: `Booking ${invoiceNumber} was created by ${req.user.email}`,
      userIds: []
    });

    res.status(201).json({ booking: result.rows[0] });
  } catch (err) {
    next(err);
  }
};

const updateBooking = async (req, res, next) => {
  try {
    const {
      invoiceNumber,
      customerName,
      customerPhone,
      pickupLocation,
      dropoffLocation,
      startTime,
      endTime,
      driverId,
      vehicleId,
      notes,
      status
    } = req.body;
    const result = await query(
      `UPDATE bookings SET invoice_number=$1, customer_name=$2, customer_phone=$3, pickup_location=$4, dropoff_location=$5, start_time=$6, end_time=$7, driver_id=$8, vehicle_id=$9, notes=$10, status=$11, updated_at=NOW()
       WHERE id = $12 RETURNING *`,
      [invoiceNumber, customerName, customerPhone, pickupLocation, dropoffLocation, startTime, endTime, driverId, vehicleId, notes, status || 'pending', req.params.id]
    );
    broadcastNotification({
      title: 'Booking updated',
      message: `Booking ${result.rows[0].invoice_number} was updated`,
      userIds: []
    });
    res.json({ booking: result.rows[0] });
  } catch (err) {
    next(err);
  }
};

const deleteBooking = async (req, res, next) => {
  try {
    await query('DELETE FROM bookings WHERE id = $1', [req.params.id]);
    res.json({ message: 'Booking deleted successfully' });
  } catch (err) {
    next(err);
  }
};

module.exports = { getBookings, getBookingById, createBooking, updateBooking, deleteBooking };
