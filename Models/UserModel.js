const mongoose = require('mongoose');

let UserSchema = new mongoose.Schema({
    "_id": Number,
    "name": String,
    "email": String,
    "password": String,
    "gender": String,
    "age": Number,
    "cart": Array,
    "fav": Array,
    "address": Object,
    "phone": String,
    "isAdmin": Boolean
});

module.exports = mongoose.model('users', UserSchema);