// routes/userRoutes.js

const express = require('express');
const userController = require('../controllers/userController');
const upload = require('../middlewares/upload'); // Подключаем middleware для загрузки файлов
const router = express.Router();

router.post('/users', userController.createUser);
router.post('/userProfiles', upload.single('profileImage'), userController.createUserProfile);
router.get('/users', userController.getAllUsers);
router.get('/users/:id', userController.getUserById);
router.get('/userProfiles', userController.getAllUserProfiles);
router.get('/userProfiles/:userId', userController.getUserProfileById);
router.put('/users/:id', userController.updateUser);
router.delete('/users/:id', userController.deleteUser);
router.delete('/userProfiles/:userId', userController.deleteUserProfileById);

module.exports = router;
