const express = require('express');
const authController = require('../controllers/auth.controller');
const validationRules = require('../middleware/validation.middleware');

const router = express.Router();



router.post('/register', validationRules.registerUserValidationRules, authController.registerUser);
router.post('/login', validationRules.loginUserValidationRules, authController.loginUser);
router.post('/logout', authController.logoutUser);

module.exports = router