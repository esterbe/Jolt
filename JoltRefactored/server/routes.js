var express = require('express');
var router = express.Router();

// Require controller modules.
var userController = require('../controllers/userController');
router.get('/user/current', userController.getCurrentUser);
router.post('/user/login', userController.login);
