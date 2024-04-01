const express = require('express');
const Login = require('../Controllers/LoginController');
const router = express.Router();

router.post('/',Login)

module.exports = router