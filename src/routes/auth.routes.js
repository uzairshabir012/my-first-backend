const express = require("express");
const authController = require("../controllers/auth.controller");
const validationMiddleware = require("../middleware/validation.middleware");

const router = express.Router();

router.post(
    "/register",
    validationMiddleware.registerUserValidationRules,
    authController.registerUser
);

router.post(
    "/login",
    validationMiddleware.loginUserValidationRules,
    authController.loginUser
);

router.post("/logout", authController.logoutUser);

module.exports = router;