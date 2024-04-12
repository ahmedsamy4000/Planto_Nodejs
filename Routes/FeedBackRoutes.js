const express=require("express");
const router=express.Router();
const feedback_controller=require("../Controllers/FeedBackController");
const AdminPermission = require('../MiddleWares/AdminPermissions');


let courses=[];
let crsID=0;
router.get("/",AdminPermission,feedback_controller.getallFeedbacks);

router.get("/:id",AdminPermission,feedback_controller.getFeedbackById);

router.post("/",AdminPermission,feedback_controller.addNewFeedback);


router.put("/:id",AdminPermission,feedback_controller.updateFeedbackById);

router.delete("/:id",AdminPermission,feedback_controller.deleteFeedbackById);

module.exports=router;