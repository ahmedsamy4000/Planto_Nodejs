


const productValidation=require("../Utils/ProductValidation");
const ProductModel = require("../Models/ProductModel");



let getallProducts= async (req,res)=>{
    let allProducts=await ProductModel.getallProducts();
    res.status(200).json({data:allProducts});

};

let getProductById= async (req,res)=>{
    let id =req.params.id;
   let filterProduct= await productModel.findProductsById(id);
    if(filterProduct){res.json({message:"Founded",data:filterProduct})}
    else{res.json({message:"no Products founded"})}
    
    };

let addNewProduct= async (req,res)=>{
    
    if(productValidation(req.body)){
        let newProduct=new ProductModel(req.body);
        newProduct.SaveProduct(); 
       // students.push(newstudent);
        res.status(200).json({data:newProduct,message:"added successfully"});
    }else{
        res.json({message:productValidation.errors[0].message});
    }
   

};
let updateProductById= async(req,res)=>{
    let id=req.params.id;
    let f=0;
    let updatedProduct=[];
    if(ProductValidation(req.body)){
        req.body.id=+id;
         updatedProduct=req.body;
       let result=await ProductModel.UpdateCourse(id,updatedProduct);
       if(result){f=1;}
       console.log(result);
       console.log(updatedProduct);
    }else{
        res.json({message:ProductValidation.errors[0].message})
    }
    if(f==1){res.json({data:updatedProduct, message:"Updated Succesfully"})}
    else {res.json({message:"Product Not Found"})};
}
let deleteProductById= async(req,res)=>{
    let id=+req.params.id;

    let result=await ProductModel.DeleteCourse(id);
    console.log(result);
    if(result){ res.json({message:"Deleted Successfully"});}
    else{ res.json({message:"Product Not Found"})}
    };


module.exports={
    getallProducts,
    getProductById,
    addNewProduct,
    updateProductById,
    deleteProductById
}