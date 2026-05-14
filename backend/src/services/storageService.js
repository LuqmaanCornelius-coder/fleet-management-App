const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const UPLOAD_PATH = process.env.UPLOAD_PATH || path.join(__dirname, '../../uploads');

if (!fs.existsSync(UPLOAD_PATH)) {
  fs.mkdirSync(UPLOAD_PATH, { recursive: true });
}

const saveFileLocally = async (file) => {
  const fileExtension = path.extname(file.originalname);
  const fileName = `${uuidv4()}${fileExtension}`;
  const destination = path.join(UPLOAD_PATH, fileName);
  fs.renameSync(file.path, destination);
  return {
    name: fileName,
    url: `/uploads/${fileName}`
  };
};

module.exports = { saveFileLocally };
