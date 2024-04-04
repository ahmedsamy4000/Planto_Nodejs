const express = require('express');
const router = express.Router();
const receipt = require('../Controllers/ReceiptController');

router.get('/', receipt.GetAllReceipts);
// router.get('/:id', receipt.GetReceiptByID);
router.post('/', receipt.AddReceipt);
router.put('/:id', receipt.UpdateReceipt);
router.delete('/:id', receipt.DeleteReceipt);
router.get('/:month', receipt.getReceiptsByMonth);




module.exports = router
