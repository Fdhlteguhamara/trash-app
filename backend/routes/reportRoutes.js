const express = require('express');
const router = express.Router();

const multer = require('multer');
const { PutObjectCommand } = require("@aws-sdk/client-s3");
const s3 = require('../s3');

// simpan file sementara di memory
const upload = multer({ storage: multer.memoryStorage() });

router.post('/', upload.single('image'), async (req, res) => {
  try {
    const { description, lat, lng } = req.body;

    let imageUrl = null;

    if (req.file) {
      const fileName = Date.now() + '-' + req.file.originalname;

      await s3.send(new PutObjectCommand({
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: fileName,
        Body: req.file.buffer,
        ContentType: req.file.mimetype,
      }));

      imageUrl = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileName}`;
    }

    // simpan ke database (contoh)
    // INSERT INTO reports (description, lat, lng, image_url)

    res.json({
      message: "Upload berhasil",
      imageUrl
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Upload gagal" });
  }
});

module.exports = router;