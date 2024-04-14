const express = require('express');
const router = express.Router();
const user = require('../Controllers/UserController');

router.get('/', user.GetUser);
router.put('/', user.UpdateUser);
router.post('/cart/add', user.AddToCart);
router.get('/get/cart', user.GetCart);
router.put('/cart', user.UpdateCart);
router.post('/cart/delete', user.DeleteFromCart);
router.get('/favourites',user.GetFavourites);
router.post('/favourites/add',user.AddToFavourites);
router.put('/favourites',user.UpdateFavourites);
router.post('/favourites/delete',user.DeleteFromFavourites);
router.delete('/cart/alldelete', user.DeleteCart);
module.exports = router
