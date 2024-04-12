const jwt = require('jsonwebtoken');
const UserModel = require('../Models/UserModel');

let Permission = async (req, res, next) => {
    let JWT = req.header('x-auth-token');
    if (JWT) {
        let decoded = jwt.decode(JWT, 'Planto')
        let user = await UserModel.findOne({ email: decoded.email });
        if (!user.isAdmin)
            return res.json({ message: "Not Allowed" });
        next();
    }
    else{
        return res.json({ message: "Not Allowed" });
    }
}

module.exports = Permission