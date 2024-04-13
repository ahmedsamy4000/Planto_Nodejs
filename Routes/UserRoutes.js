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
router.get('/favourites/:email',user.GetFavourites);
router.post('/favourites/add',user.AddToFavourites);
router.put('/favourites',user.UpdateFavourites);
router.post('/favourites/delete',user.DeleteFromFavourites);

module.exports = router
