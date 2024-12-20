const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { validateUser } = require('../middleware/validateUser');
const loginLimiter = require('../middleware/rateLimiter'); 

router.post('/register', validateUser, authController.register);
router.post('/login', loginLimiter, authController.login);

module.exports = router;
