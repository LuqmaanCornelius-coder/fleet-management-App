const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { query } = require('../config/db');

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const result = await query('SELECT id, email, password_hash, role, first_name, last_name FROM users WHERE email = $1', [email]);
    if (!result.rows.length) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    const user = result.rows[0];
    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    const token = jwt.sign({ userId: user.id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN || '8h'
    });
    res.json({ token, user: { id: user.id, email: user.email, role: user.role, firstName: user.first_name, lastName: user.last_name } });
  } catch (err) {
    next(err);
  }
};

const getProfile = async (req, res, next) => {
  try {
    const result = await query('SELECT id, email, role, first_name, last_name, phone, license_number, pdp_expiry, assigned_vehicle_id FROM users WHERE id = $1', [req.user.id]);
    res.json({ profile: result.rows[0] });
  } catch (err) {
    next(err);
  }
};

const updateProfile = async (req, res, next) => {
  try {
    const { firstName, lastName, phone } = req.body;
    await query(
      'UPDATE users SET first_name = $1, last_name = $2, phone = $3 WHERE id = $4',
      [firstName, lastName, phone, req.user.id]
    );
    res.json({ message: 'Profile updated successfully' });
  } catch (err) {
    next(err);
  }
};

module.exports = { login, getProfile, updateProfile };
