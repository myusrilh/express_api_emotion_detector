const express = require('express');
const router = express.Router();
const doctor = require('../models/doctor.model.js');

router.get('/getAll', doctor.getAllDoctor);

module.exports = router;