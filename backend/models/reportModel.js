const db = require('../db');

exports.createReport = (data, callback) => {
  const sql = `INSERT INTO reports 
  (title, description, image_url, latitude, longitude, status) 
  VALUES (?, ?, ?, ?, ?, ?)`;

  db.query(sql, [
    data.title,
    data.description,
    data.image_url,
    data.latitude,
    data.longitude,
    'Dilaporkan'
  ], callback);
};

exports.getAllReports = (callback) => {
  db.query('SELECT * FROM reports', callback);
};