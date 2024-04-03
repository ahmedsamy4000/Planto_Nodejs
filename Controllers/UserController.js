const UserModel = require('../Models/UserModel')
let GetUserByEmail = async(req, res)=>{
    let user = await UserModel.findOne({email: req.params.email.toLowerCase()});
    if (user) {
        res.status(200).json({ data: user })
    } else {
        res.status(200).json({ message: "Not Found Email=" + req.params.email })
    }
}

module.exports = {
    GetUserByEmail
}