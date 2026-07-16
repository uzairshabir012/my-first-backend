const userModel = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

async function registerUser(req, res) {
    try {
        const { username, email, password } = req.body;

        const userAlreadyExists = await userModel.findOne({
            $or: [{ username }, { email }]
        });

        if (userAlreadyExists) {
            return res.status(409).json({
                message: "User Already Exists"
            });
        }

        const hash = await bcrypt.hash(password, 10);

        const user = await userModel.create({
            username,
            email,
            password: hash,
            role: req.body.role || "user"
        });

        const token = jwt.sign(
            {
                id: user._id,
                role: user.role
            },
            process.env.JWT_SECRET
        );

        res.cookie("token", token, {
            httpOnly: true
        });

        return res.status(201).json({
            message: "User Registered",
            user: {
                username: user.username,
                email: user.email,
                role: user.role
            }
        });

    } catch (err) {
        console.error("Register Error:", err);

        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
}

async function loginUser(req, res) {
    try {
        const { username, email, password } = req.body;

        const user = await userModel.findOne({
            $or: [{ username }, { email }]
        });

        if (!user) {
            return res.status(401).json({
                message: "Wrong email or username"
            });
        }

        const isPassValid = await bcrypt.compare(password, user.password);

        if (!isPassValid) {
            return res.status(401).json({
                message: "Wrong Password"
            });
        }

        const token = jwt.sign(
            {
                id: user._id,
                role: user.role
            },
            process.env.JWT_SECRET
        );

        res.cookie("token", token, {
            httpOnly: true
        });

        return res.status(200).json({
            message: "User Login",
            user: {
                username: user.username,
                email: user.email,
                role: user.role
            }
        });

    } catch (err) {
        console.error("Login Error:", err);

        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
}

function logoutUser(req, res) {
    res.clearCookie("token");

    return res.status(200).json({
        message: "Logout Successfully"
    });
}

module.exports = {
    registerUser,
    loginUser,
    logoutUser
};