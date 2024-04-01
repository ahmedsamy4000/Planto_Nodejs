let ReceiptModel = require('../Models/RecieptModel');
let ReceiptValidation = require('../Utils/ReceiptValidation');

let GetAllReceipts = async (req, res) => {
    let allReceipts = await ReceiptModel.find();
    res.status(200).json({ data: allReceipts });
}

let AddReceipt = (req, res) => {
    if (ReceiptValidation(req.body)) {
        let newReceipt = new ReceiptModel(req.body);
        newReceipt.date = Date.now();
        newReceipt.save();
        res.status(200).json({ data: newReceipt, message: "Added Successfully" });
    } else {
        res.json({ message: ReceiptValidation.errors[0].message });
    }
}

let UpdateReceipt = (req, res) => {

}

let DeleteReceipt = (req, res) => {

}

module.exports = {
    GetAllReceipts,
    AddReceipt,
    UpdateReceipt,
    DeleteReceipt,
}