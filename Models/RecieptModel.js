const mongoose = require('mongoose');

let ReceiptSchema = new mongoose.Schema({
    user: String,
    product: Array,
    date: Date,
    totalPrice: Number
});

module.exports = mongoose.model('receipt', ReceiptSchema);