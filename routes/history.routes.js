const express = require('express');
const router = express.Router();
const history = require('../models/history.model.js');

router.get('/getAll', history.getAllHistory);
router.post('/getHistoryByPatientID', history.getHistoryByPatientID);
router.post('/getHistoryByDoctorID', history.getHistoryByDoctorID);

module.exports = router;