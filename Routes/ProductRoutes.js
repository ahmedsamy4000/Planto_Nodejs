const express=require("express");
const router=express.Router();
const product_controller=require("../Controllers/ProductController");


const productValidation=require("../Utils/ProductValidation");


router.get("/",product_controller.getallProducts);

router.get("/:name",product_controller.getProductByName);

router.post("/",product_controller.addNewProduct);


router.put("/:name",product_controller.updateProductByName);

router.delete("/:name",product_controller.deleteProductByName);
router.get("/search/:name",product_controller.searchProductByName);


module.exports=router;