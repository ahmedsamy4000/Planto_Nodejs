const express = require('express');
const router = express.Router();
const receipt = require('../Controllers/ReceiptController');
const AdminPermission = require("../MiddleWares/AdminPermissions");
const UserPermission = require("../MiddleWares/UserPermessions");


router.get('/',AdminPermission,receipt.GetAllReceipts);
// router.get('/:id', receipt.GetReceiptByID);
router.post('/',receipt.AddReceipt);
router.put('/:id', AdminPermission,receipt.UpdateReceipt);
router.delete('/:id', AdminPermission, receipt.DeleteReceipt);
router.get('/:month', AdminPermission,receipt.getReceiptsByMonth);
router.get('/total/:month', AdminPermission, receipt.totalProducts);


module.exports = router
