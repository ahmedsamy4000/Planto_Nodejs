const bcrypt = require('bcrypt')
const userModel = require('../Models/UserModel')
const userValidation = require("../Utils/UserValidation")

let id = 0;
let Register = async (req, res) => {

    if (userValidation(req.body)) {

        req.body.email = req.body.email.toLowerCase();

        let user = await userModel.findOne({ email: req.body.email })
        if (user)
            return res.status(200).json({ message: false });

        let users = await userModel.find({});
        id = users ? users[users.length - 1]._id + 1 : 1;
        req.body._id = id;

        let salt = await bcrypt.genSalt(10);
        let hash = await bcrypt.hash(req.body.password, salt);
        req.body.password = hash;
        req.body.isAdmin = false;
        let newUser = new userModel(req.body);
        newUser.save().then(() => {
            res.status(200).json({ message: true, data: newUser });
        })
    } else {
        res.status(200).json({ message: userValidation.errors[0].message });
    }
}

module.exports = Register