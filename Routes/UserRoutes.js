const express = require('express');
const router = express.Router();
const user = require('../Controllers/UserController');

router.get('/:email', user.GetUserByEmail);
router.post('/:email', user.UpdateUser);
router.post('/cart/add', user.AddToCart);
router.get('/cart/:email', user.getCart);

module.exports = router
