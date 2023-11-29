
const express = require('express');
const registrationController = require('../../controllers/registrationController');
const matchOTP = require('../../controllers/matchOtpController');
const loginController = require('../../controllers/loginController');
const router = express.Router();

router.post('/registration', registrationController)
router.post('/matchOTP', matchOTP)
router.post('/login', loginController)

module.exports = router;