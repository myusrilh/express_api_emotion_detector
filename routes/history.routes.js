const express = require('express');
const router = express.Router();
const history = require('../models/history.model.js');

router.get('/getAll', history.getAllHistory);

module.exports = router;