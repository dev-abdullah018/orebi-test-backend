const express = require('express');
const register = require('../../controllers/registrationController');
const router = express.Router();

router.get('/user', register)

module.exports = router;