const jwt = require("jsonwebtoken");

async function authArtist(req, res, next) {
    try {
        const token = req.cookies.token;

        if (!token) {
            return res.status(401).json({
                message: "Unauthorized, No token"
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (decoded.role !== "artist") {
            return res.status(403).json({
                message: "You don't have access"
            });
        }

        req.user = decoded;

        return next();

    } catch (err) {
        console.error("Authentication Error:", err);

        return res.status(401).json({
            message: "Unauthorized User"
        });
    }
}

async function authUser(req, res, next) {
    try {
        const token = req.cookies.token;

        if (!token) {
            return res.status(401).json({
                message: "Unauthorized"
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decoded;

        return next();

    } catch (err) {
        console.error("Authentication Error:", err);

        return res.status(401).json({
            message: "Unauthorized"
        });
    }
}

module.exports = {
    authArtist,
    authUser
};