const UserModel = require('../Models/UserModel')
const UserValidation = require('../Utils/UserValidation')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

let GetUser = async (req, res) => {
    let JWT = req.header('token');
    let decoded = jwt.decode(JWT, 'Planto')
    let user = await UserModel.findOne({ email: decoded.email });
    if (user) {
        res.status(200).json({ data: user })
    } else {
        res.status(200).json({ message: "Not Found Email=" + decoded.email })
    }
}
let UpdateUser = async (req, res) => {
    let JWT = req.header('token');
    let decoded = jwt.decode(JWT, 'Planto')
    if (UserValidation(req.body)) {
        let salt = await bcrypt.genSalt(10);
        let hash = await bcrypt.hash(req.body.password, salt);
        req.body.password = hash;
        let newUser = await UserModel.findOneAndUpdate({ email: decoded.email }, {
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
    let JWT = req.header('token');
    let decoded = jwt.decode(JWT, 'Planto')
    let user = await UserModel.findOne({ email: decoded.email });
    if (user) {
        if (user.cart == undefined) {
            user.cart = [];
        }
        let myCart = user.cart;
        let isExist = false;
        for (let item of myCart) {
            if (item.product.name == req.body.product.name) {
                if (item.size == req.body.size) {
                    isExist = true;
                    item.quantity += req.body.quantity;
                }
            }
        }
        if (!isExist) {
            myCart.push({ product: req.body.product, quantity: req.body.quantity, size: req.body.size ,price:req.body.price});
        }
        let newUser = await UserModel.findOneAndUpdate({ email: decoded.email }, {
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

let AddToFavourites = async (req, res) => {
    let JWT = req.header('token');
    let decoded = jwt.decode(JWT, 'Planto')
    let user = await UserModel.findOne({ email: decoded.email });
    if (user) {
        if (user.fav == undefined) {
            user.fav = [];
        }
        let fav = user.fav;
        let isExist = false;
        for (let favItem of fav) {
            if (favItem.product.name == req.body.product.name) {
                isExist = true;
            }
        }
        if (!isExist) {
            fav.push({ product: req.body.product });
        }
        let UpdatedUser = await UserModel.findOneAndUpdate({ email: decoded.email }, {
            "cart": user.cart, "name": user.name, "email": user.email,
            "phone": user.phone, "gender": user.gender, "address": user.addres, "age": user.age, "password": user.password, "fav": user.fav
        });
        if (UpdatedUser && !isExist) {
            return res.status(200).json({ message: "1", data: UpdatedUser });
        }
        return res.status(200).json({ message: "0" });
    }
    return res.status(400).json({ message: "mail Not Foun" })
}

let GetFavourites = async (req, res) => {
    let JWT = req.header('token');
    let decoded = jwt.decode(JWT, 'Planto')
    let user = await UserModel.findOne({ email: decoded.email });
    if (user) {
        res.status(200).json({ messeage: "founded", data: user.fav })
    } else {
        res.status(200).json({ message: "Email Not Found : " + decoded.email });
    }
}

let UpdateFavourites = async (req, res) => {
    let JWT = req.header('token');
    let decoded = jwt.decode(JWT, 'Planto')
    let user = await UserModel.findOne({ email: decoded.email });
    user.fav[req.body.index] = req.body.fav;
    let result = await UserModel.findOneAndUpdate({ email: decoded.email }, {
        "fav": user.fav, "name": user.name, "email": user.email, "phone": user.phone, "gender": user.gender, "address": user.addres,
        "age": user.age, "password": user.password
    });
    if (result) {
        return res.status(200).json({ message: "Updated Successfully" });
    }
    return res.status(400).json({ message: "Update Failed" });
}
let DeleteFromFavourites = async (req, res) => {
    let JWT = req.header('token');
    let decoded = jwt.decode(JWT, 'Planto')
    let user = await UserModel.findOne({ email: decoded.email });
    user.fav.splice(req.body.index, 1);
    let result = await UserModel.findOneAndUpdate({ email: decoded.email }, {
        "fav": user.fav, "name": user.name, "email": user.email, "phone": user.phone, "gender": user.gender, "address": user.addres,
        "age": user.age, "password": user.password
    });
    if (result) {
        return res.status(200).json({ message: "Deleted Succesfully" });
    }
    return res.status(400).json({ message: "Failed to Delete" });
}

let GetCart = async (req, res) => {
    let JWT = req.header('token');
    let decoded = jwt.decode(JWT, 'Planto')
    let user = await UserModel.findOne({ email: decoded.email });
    if (user) {
        res.status(200).json({ data: user.cart })
    } else {
        res.status(200).json({ message: "Not Found Email=" + decoded.email })
    }
}
let UpdateCart = async (req, res) => {
    let JWT = req.header('token');
    let decoded = jwt.decode(JWT, 'Planto')
    let user = await UserModel.findOne({ email: decoded.email });
    user.cart[req.body.index] = req.body.cart;
    let result = await UserModel.findOneAndUpdate({ email: decoded.email }, {
        "cart": user.cart, "name": user.name, "email": user.email,
        "phone": user.phone, "gender": user.gender, "address": user.addres, "age": user.age, "password": user.password
    });
    if (result) {
        return res.status(200).json({ message: "true" });
    }
    return res.status(200).json({ message: "false" });
}
let DeleteFromCart = async (req, res) => {
    let JWT = req.header('token');
    let decoded = jwt.decode(JWT, 'Planto')
    let user = await UserModel.findOne({ email: decoded.email });
    user.cart.splice(req.body.index, 1);
    let result = await UserModel.findOneAndUpdate({ email: decoded.email }, {
        "cart": user.cart, "name": user.name, "email": user.email,
        "phone": user.phone, "gender": user.gender, "address": user.addres, "age": user.age, "password": user.password
    });
    if (result) {
        return res.status(200).json({ message: "true" });
    }
    return res.status(200).json({ message: "false" });
}

let DeleteCart = async (req, res) => {
    let JWT = req.header('token');
    let decoded = jwt.decode(JWT, 'Planto')
    let user = await UserModel.findOne({ email: decoded.email });
    user.cart = [];
    let result = await UserModel.findOneAndUpdate({ email: decoded.email }, user);
    if (result) {
        return res.status(200).json({ message: "deleted successfully" });
    }
    return res.status(200).json({ message: "false" });
}

module.exports = {
    GetUser,
    UpdateUser,
    AddToCart,
    GetCart,
    UpdateCart,
    DeleteFromCart,
    AddToFavourites,
    GetFavourites,
    UpdateFavourites,
    DeleteFromFavourites,
    DeleteCart
}