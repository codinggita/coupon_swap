const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const validateUser = require('../middleware/validation');
router.post('/signin', validateUser, authController.signUp);
module.exports = router;
