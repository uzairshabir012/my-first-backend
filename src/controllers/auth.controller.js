const userModel = require('../models/user.model');
const jwt = require('jsonwebtoken');




async function registerUser(req, res) {

    const { username, email, password } = req.body;

    const isUserAlreadyExists = await userModel.findOne({ email });


    if (isUserAlreadyExists) {
        return res.status(409).json({
            message: "User Already Exists"
        })
    }


    const user = await userModel.create({
        username, email, password
    })

    const token = jwt.sign({ id: user._id }, process.env.JWt_SECRET);

    res.cookie("CookieTOken", token);

    res.status(201).json({
        message: "User Registered",
        user
    })

}

async function getCookies(req, res) {
    console.log("Cookies: ", req.cookies);

    res.status(200).json({
        message: "Cookies",
        Cookies: req.cookies
    })
}


async function allUsers(req, res) {
    const users = await userModel.find();
    res.status(200).json({
        message: "All Users",
        users
    })
}





module.exports = { registerUser, getCookies, allUsers }