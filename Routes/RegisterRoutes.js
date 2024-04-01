const express = require('express');
const Register = require('../Controllers/RegisterController');
const router = express.Router();

router.post('/', Register)

module.exports = router