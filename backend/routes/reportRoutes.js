const express = require('express');
const router = express.Router();
const reportController = require('../controllers/reportController');

router.post('/report', reportController.createReport);
router.get('/reports', reportController.getReports);

module.exports = router;