const mongoose = require('mongoose');

let ReceiptSchema = new mongoose.Schema({
    product: Array,
    date: Date,
    totalPrice: Number
});

module.exports = mongoose.model('receipt', ReceiptSchema);