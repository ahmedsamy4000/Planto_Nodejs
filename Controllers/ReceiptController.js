let ReceiptModel = require('../Models/RecieptModel');
let ReceiptValidation = require('../Utils/ReceiptValidation');
const { ObjectId } = require('mongodb');

let GetAllReceipts = async (req, res) => {
    let allReceipts = await ReceiptModel.find();
    res.status(200).json({ data: allReceipts });
}

let GetReceiptByID = async (req, res) => {
    if (req.params.id.length != 24)
        return res.status(200).json({ message: "Invalid ID=" + req.params.id })
    let ID = new ObjectId(req.params.id);
    let receipt = await ReceiptModel.findById(ID);
    if (receipt) {
        res.status(200).json({ data: receipt })
    } else {
        res.status(200).json({ message: "Not Found ID=" + ID })
    }
}

let AddReceipt = (req, res) => {
    if (ReceiptValidation(req.body)) {
        let newReceipt = new ReceiptModel(req.body);
        newReceipt.date = Date.now();
        newReceipt.save();
        res.status(200).json({ data: newReceipt, message: "Added Successfully" });
    } else {
        res.status(200).json({ message: ReceiptValidation.errors[0].message });
    }
}

let UpdateReceipt = async (req, res) => {
    if (req.params.id.length != 24)
        return res.status(200).json({ message: "Invalid ID=" + req.params.id })
    if (ReceiptValidation(req.body)) {
        let ID = new ObjectId(req.params.id);
        let UpdatedReceipt = await ReceiptModel.findByIdAndUpdate(ID, { "product": req.body.product, "totalPrice": req.body.totalPrice });
        if (UpdatedReceipt) {
            res.status(200).json({ message: "Updated successfully" })
        } else {
            res.status(200).json({ message: "Not Found ID=" + ID })
        }
    } else {
        res.json({ message: ReceiptValidation.errors[0].message });
    }
}

let DeleteReceipt = async (req, res) => {
    if (req.params.id.length != 24)
        return res.status(400).json({ message: "Invalid ID=" + req.params.id })
    let ID = new ObjectId(req.params.id);
    let deletedReceipt = await ReceiptModel.findByIdAndDelete(ID)
    if (deletedReceipt) {
        res.status(200).json({ message: "Deleted successfully" })
    } else {
        res.status(200).json({ message: "Not Found ID=" + ID })
    }
}

let getReceiptsByMonth = async (req, res) => {
    try {
        let month = parseInt(req.params.month);
        
        const Data = await ReceiptModel.aggregate([
            {
                $match: {
                    $expr: {
                        $eq: [{ $month: '$date' }, month]
                    }
                }
            }
        ]);
       lastData= productsStat(Data)

        res.status(200).json({ data: lastData });
    } catch (error) {
        console.error("Error fetching receipts:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

function productsStat(data) {
    const productQuantities = {};
    data.forEach(entry => {
        entry.product.forEach(product => {
            //const parsedProduct = JSON.parse(product); 
            product= JSON.parse(product)
            console.log(product);            
            if (productQuantities) {
            } else {
            }
        });
    });


console.log(productQuantities)

   return productQuantities
}



module.exports = {
    GetAllReceipts,
    GetReceiptByID,
    AddReceipt,
    UpdateReceipt,
    DeleteReceipt,
    getReceiptsByMonth
}