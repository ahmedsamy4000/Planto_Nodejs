const express = require('express');
const router = express.Router();
const user = require('../Controllers/UserController');

router.get('/:email', user.GetUserByEmail);
router.get('/id/:id', user.GetUserByID);
router.post('/:email', user.UpdateUser);
router.post('/cart/add', user.AddToCart);
router.get('/cart/:email', user.GetCart);
router.put('/cart', user.UpdateCart);
router.post('/cart/delete', user.DeleteFromCart);

module.exports = router
