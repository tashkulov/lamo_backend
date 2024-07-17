const express = require('express');
const userController = require('../controllers/userController');
const {createUserProfile} = require("../controllers/userController");
const router = express.Router();

router.post('/users', userController.createUser);
router.get('/users', userController.getAllUsers);
router.get('/users/:id', userController.getUserById);
router.put('/users/:id', userController.updateUser);
router.delete('/users/:id', userController.deleteUser);
router.post('/userProfiles', createUserProfile);

module.exports = router;
