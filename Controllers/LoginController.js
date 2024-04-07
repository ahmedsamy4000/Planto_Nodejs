const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const userModel = require('../Models/UserModel')
let Login = async (req, res) => {
    req.body.email = req.body.email.toLowerCase();
    let user = await userModel.findOne({ email: req.body.email });

    if (!user)
        return res.status(200).json({ message: false });

    let pass = await bcrypt.compare(req.body.password, user.password);
    if (!pass)
        return res.status(200).json({ message: false });

    let JWT = await jwt.sign({ email: user.email, id: user._id, isAdmin: user.isAdmin }, "Planto");
    res.header("x-auth-token", JWT);
    return res.status(200).json({ message: true ,token:JWT});
}

module.exports = Login