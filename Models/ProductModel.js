const mongoose = require('mongoose');


let ProductSchema=new mongoose.Schema({
        "name": String,
        "id":Number
})
let Products=mongoose.model("products",ProductSchema)


var db=mongoose.connection;




let p_id=0;

class ProductModel{
    name="";
    id=0;
    constructor(product){
        this.name=product.name;  
        this.id=product.id;
    }
    
    static async getallProducts(){
       
       return await Products.find();
    }
    static async findProductsById(id){
        let foundProduct=await Products.findOne({id:+id});
        return foundProduct;
    }
    async SaveProduct(){ 
        this.id = ++p_id;
        const newProduct = new Products({
            name: this.name,
            id: this.id
        });
        await newProduct.save();
        return newProduct;
    }

   static async UpdateProduct(id,data){
        let result=await Products.updateOne({id:id},data);
       
        if (result.modifiedCount > 0) {
            return true; // Update successful
        } else {
            return false; // No documents were modified
        }
    }
    static async DeleteProduct(id){
        let result=await Products.deleteOne({id:id});
        console.log(result);
        if(result.deletedCount>0){
            return true;
        }else{
            return false;
        }
    }
    
}

module.exports=ProductModel;