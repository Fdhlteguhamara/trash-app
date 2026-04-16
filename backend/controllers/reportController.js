const AWS = require('aws-sdk');
const multer = require('multer');
const reportModel = require('../models/reportModel');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage }).single('image');

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
  region: process.env.AWS_REGION
});

exports.createReport = (req, res) => {
  upload(req, res, function(err) {
    if (err) return res.status(500).send(err);

    const file = req.file;

    const params = {
      Bucket: process.env.AWS_BUCKET,
      Key: Date.now() + '-' + file.originalname,
      Body: file.buffer,
      ContentType: file.mimetype
    };

    s3.upload(params, (err, data) => {
      if (err) return res.status(500).send(err);

      const reportData = {
        title: req.body.title,
        description: req.body.description,
        image_url: data.Location,
        latitude: req.body.latitude,
        longitude: req.body.longitude
      };

      reportModel.createReport(reportData, (err, result) => {
        if (err) return res.status(500).send(err);
        res.send({ message: 'Report created!', data: result });
      });
    });
  });
};

exports.getReports = (req, res) => {
  reportModel.getAllReports((err, results) => {
    if (err) return res.status(500).send(err);
    res.send(results);
  });
};