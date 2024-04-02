const productValidation = require("../Utils/ProductValidation");
const ProductModel = require("../Models/ProductModel");

let getallProducts = async (req, res) => {
    try {
        let allProducts = await ProductModel.getallProducts();
        res.status(200).json({ data: allProducts });
    } catch (error) {
        console.error("Error retrieving products:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

let getProductByName = async (req, res) => {
    try {
        let name = req.params.name;
        let filterProduct = await ProductModel.findProductsByName(name);
        if (filterProduct) {
            res.json({ message: "Founded", data: filterProduct });
        } else {
            res.json({ message: "No products found" });
        }
    } catch (error) {
        console.error("Error retrieving product by name:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

let addNewProduct = async (req, res) => {
    try {
        if (productValidation(req.body)) {
            let newProduct = new ProductModel(req.body);
            await newProduct.saveProduct();
            res.status(200).json({ data: newProduct, message: "Added successfully" });
        } else {
            res.status(400).json({ message: productValidation.errors[0].message });
        }
    } catch (error) {
        console.error("Error adding new product:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

let updateProductByName = async (req, res) => {
    try {
        let name = req.params.name;
        let updatedProduct = null;
        if (productValidation(req.body)) {
            req.body.name = name;
            updatedProduct = req.body;
            let result = await ProductModel.updateProductByName(name, updatedProduct);
            if (result) {
                res.status(200).json({ data: updatedProduct, message: "Updated successfully" });
            } else {
                res.status(404).json({ message: "Product not found" });
            }
        } else {
            res.status(400).json({ message: productValidation.errors[0].message });
        }
    } catch (error) {
        console.error("Error updating product by name:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

let deleteProductByName = async (req, res) => {
    try {
        let name = req.params.name;
        let result = await ProductModel.deleteProductByName(name);
        if (result) {
            res.status(200).json({ message: "Deleted successfully" });
        } else {
            res.status(404).json({ message: "Product not found" });
        }
    } catch (error) {
        console.error("Error deleting product by name:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = {
    getallProducts,
    getProductByName,
    addNewProduct,
    updateProductByName,
    deleteProductByName
};
