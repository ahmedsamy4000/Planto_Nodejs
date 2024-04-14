const express = require('express');
const router = express.Router();
const receipt = require('../Controllers/ReceiptController');
const AdminPermission = require("../MiddleWares/AdminPermissions");
const UserPermission = require("../MiddleWares/UserPermessions");


router.get('/',AdminPermission,receipt.GetAllReceipts);
// router.get('/:id', receipt.GetReceiptByID);
router.post('/',receipt.AddReceipt);
router.put('/:id',receipt.UpdateReceipt);
router.delete('/:id', receipt.DeleteReceipt);
router.get('/:month',receipt.getReceiptsByMonth);
router.get('/total/:month', receipt.totalProducts);


module.exports = router
