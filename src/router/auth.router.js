const express = require('express');
const authController = require('../controllers/auth.controller');


const router = express.Router();



router.post('/register', authController.registerUser);

router.get('/test', authController.getCookies);

router.get('/users', authController.allUsers)

module.exports = router;