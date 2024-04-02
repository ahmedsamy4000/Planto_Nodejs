const mongoose = require('mongoose');


let ProductSchema=new mongoose.Schema({
        "name": String,
        "price": String ,
        "description": String,
        "images": Array ,
       "stock": Number,
        "category": String,
        "count": Number,
        "rate" :Number
})  
let Products=mongoose.model("products",ProductSchema)


var db=mongoose.connection;


    class ProductModel {
        constructor(product) {
            this.name = product.name;
            this.price = product.price;
            this.description = product.description;
            this.images = product.images;
            this.stock = product.stock;
            this.category = product.category;
            this.count = product.count;
            this.rate = product.rate;
        }
    
    static async getallProducts(){
       
       return await Products.find();
    }
    static async findProductsByName(name){
        let foundProduct=await Products.findOne({name:name});
        return foundProduct;
    }
    async saveProduct() {
        try {
            const newProduct = new Products({
                name: this.name,
                price: this.price,
                description: this.description,
                images: this.images,
                stock: this.stock,
                category: this.category,
                count: this.count,
                rate: this.rate
            });
            await newProduct.save();
            return newProduct;
        } catch (error) {
            console.error('Error saving product:', error);
            throw error;
        }
    }

     static async updateProductByName(name, data) {
        try {
            const result = await Products.findOneAndUpdate({ name: name }, data);
            if (result) {
                return true;
            } else {
                return false;
            }
        } catch (error) {
            console.error('Error updating product:', error);
            throw error;
        }
    }
    
    static async deleteProductByName(name) {
        try {
            const result = await Products.findOneAndDelete({ name: name });
            if (result) {
                return true;
            } else {
                return false;
            }
        } catch (error) {
            console.error('Error deleting product:', error);
            throw error;
        }
    }
}

module.exports=ProductModel;