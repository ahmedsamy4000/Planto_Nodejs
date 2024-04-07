const UserModel = require('../Models/UserModel')
const UserValidation = require('../Utils/UserValidation')
const bcrypt = require('bcrypt')
let GetUserByEmail = async (req, res) => {
    let user = await UserModel.findOne({ email: req.params.email.toLowerCase() });
    if (user) {
        res.status(200).json({ data: user })
    } else {
        res.status(200).json({ message: "Not Found Email=" + req.params.email })
    }
}

let UpdateUser = async (req, res) => {
    if (UserValidation(req.body)) {
        let salt = await bcrypt.genSalt(10);
        let hash = await bcrypt.hash(req.body.password, salt);
        req.body.password = hash;
        let newUser = await UserModel.findOneAndUpdate({ email: req.params.email }, {
            "name": req.body.name, "email": req.body.email,
            "phone": req.body.phone, "gender": req.body.gender, "address": req.body.addres, "age": req.body.age, "password": req.body.password
        });
        if (newUser) {
            res.status(200).json({ message: "Updated successfully" })
        }
    } else {
        res.json({ message: UserValidation.errors[0].message });
    }
}

let AddToCart = async (req, res) => {
    req.body.email = req.body.email.toLowerCase();
    let user = await UserModel.findOne({ email: req.body.email });
    if (user) {
        if (user.cart == undefined) {
            user.cart = [];
        }
        let myCart = user.cart;
        myCart.push({ product: req.body.product, quantity: req.body.quantity });
        let newUser = await UserModel.findOneAndUpdate({ email: req.body.email }, {
            "cart": myCart, "name": user.name, "email": user.email,
            "phone": user.phone, "gender": user.gender, "address": user.addres, "age": user.age, "password": user.password
        });
        if (newUser) {
            return res.status(200).json({ message: "true" });
        }
        return res.status(200).json({ message: "false" });

    }
    return res.status(200).json({ message: "false" })
}
module.exports = {
    GetUserByEmail,
    UpdateUser,
    AddToCart
}