const express = require('express');
const router = express.Router();
const loginController = require('../auth/login-admin');

router.post('/login-admin', loginController.loginAdmin);

module.exports = router;