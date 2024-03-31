const express=require("express");
const router=express.Router();
const product_controller=require("../Controllers/ProductController");


const productValidation=require("../Utils/ProductValidation");


let courses=[];
let crsID=0;
router.get("/",product_controller.getallProducts);

router.get("/:id",product_controller.getProductById);

router.post("/",product_controller.addNewProduct);


router.put("/:id",product_controller.updateProductById);

router.delete("/:id",product_controller.deleteProductById);

module.exports=router;