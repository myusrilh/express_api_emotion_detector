const express = require('express');
const router = express.Router();
const user = require('../models/user.model.js');

router.get('/getAll', user.getAllUser);
router.post('/authenticate', user.getByUsernameAndPassword);

module.exports = router;