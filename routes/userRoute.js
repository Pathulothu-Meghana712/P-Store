const express = require('express');
const router = express.Router();
const userController = require('./../controllers/userController');

// Define the route for changing user role
router.post('/adminPage', userController.changeUserRole);

module.exports = router;
