const path = require('path');
const fs = require('fs');
const { query } = require('../config/db');
const { saveFileLocally } = require('../services/storageService');

const uploadDocument = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'File upload required' });
    }
    const saved = await saveFileLocally(req.file);
    const result = await query(
      `INSERT INTO documents (owner_type, owner_id, file_name, file_url, uploaded_by)
       VALUES ($1,$2,$3,$4,$5) RETURNING *`,
      [req.body.ownerType || 'booking', req.body.ownerId || null, saved.name, saved.url, req.user.id]
    );
    res.status(201).json({ document: result.rows[0] });
  } catch (err) {
    next(err);
  }
};

module.exports = { uploadDocument };
