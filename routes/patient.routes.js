const express = require('express');
const router = express.Router();
const patient = require('../models/patient.model.js');

router.get('/getAll', patient.getAllPatient);
router.get('/getByUserID/(:id)', patient.getPatientByUserID);

module.exports = router;