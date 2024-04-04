const express = require('express');
const router = express.Router();
const user = require('../Controllers/UserController');

router.get('/:email', user.GetUserByEmail);
router.post('/:email', user.UpdateUser);



module.exports = router
