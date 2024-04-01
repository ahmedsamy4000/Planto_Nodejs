const express = require('express');
const router = express.Router();
const receipt = require('../Controllers/ReceiptController');

router.get('/', receipt.GetAllReceipts);
router.post('/', receipt.AddReceipt);

module.exports = router
