const productValidation = require("../Utils/ProductValidation");
const ProductModel = require("../Models/ProductModel");

let getallProducts = async (req, res) => {
    try {
        let allProducts = await ProductModel.find();
        res.status(200).json({ data: allProducts });
    } catch (error) {
        console.error("Error retrieving products:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

let getProductByName = async (req, res) => {
    try {
        let name = req.params.name;
        let filterProduct = await ProductModel.findOne({name:name})
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
            await newProduct.save();
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
        console.log(req.body)
        if (productValidation(req.body)) {
            let result = await ProductModel.findOneAndUpdate({name:req.params.name},req.body)
            if (result) {
                res.status(200).json({ data:req.body , message: "Updated successfully" });
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
        let result = await ProductModel.findByIdAndDelete({name:req.params.name})
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
const searchProductByName = async (req, res) => {
  try {
    const name = req.params.name.toLowerCase(); 
    let allProducts = await ProductModel.find();

    const products = [];

    for (const product of allProducts) {
      if (product.name.toLowerCase().includes(name)) {
        products.push(product);
      }
    }
    res.json(products);
  } catch (error) {
    console.error("Error searching products by name:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
const searchProductByCategory = async (req, res) => {
    try {
      const category = req.params.category; 
      let allProducts = await ProductModel.find({category:category})
      res.json(allProducts);

    } catch (error) {
      console.error("Error searching products by name:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };
  let calcProductRate = async (req, res) => {
    try {
        let productName = req.params.name;
        const newRating = req.body.rate;
 
        let filterProduct = await ProductModel.findOne({ name: productName })
 
        // Update the product's rating
        filterProduct.rate = newRating;
 
        if (!filterProduct) {
            return res.status(404).json({ error: 'Product not found' });
        }
 
        let result = await ProductModel.findOneAndUpdate({ name: productName }, filterProduct)
        if (result) {
            res.status(200).json({ data: req.body, message: "Rating submitted successfully" });
        } else {
            res.status(404).json({ message: "Product not found" });
        }
    } catch (error) {
        console.error('Error submitting rating:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = {
    getallProducts,
    getProductByName,
    addNewProduct,
    updateProductByName,
    deleteProductByName,
    searchProductByName,
    searchProductByCategory,
    calcProductRate
};
