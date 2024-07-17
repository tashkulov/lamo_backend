const { User,UserProfile, Like, Match } = require('../models');
const path = require('path');

// Создать нового пользователя
exports.createUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const newUser = await User.create({ username, email, password });
        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
exports.createUserProfile = async (req, res) => {
    const { userId, age, gender, interests, location, bio } = req.body;
    let profileImageUrl = null;

    if (req.file) {
        profileImageUrl = path.join('uploads', req.file.filename); // Путь к изображению
    }

    try {
        const userProfile = await UserProfile.create({
            userId,
            age,
            gender,
            interests,
            location,
            bio,
            profileImageUrl
        });

        res.status(201).json(userProfile);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
// Получить всех пользователей
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        res.status(200).json(users);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
exports.getAllUserProfiles = async (req, res) => {
    try {
        const userProfiles = await UserProfile.findAll({
            include: [{ model: User, as: 'user' }]
        });
        res.status(200).json(userProfiles);
    } catch (error) {
        console.error('Error fetching user profiles:', error);
        res.status(500).json({ error: 'Failed to fetch user profiles' });
    }
};

// Получить пользователя по ID
exports.getUserById = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getUserProfileById = async (req, res) => {
    try {
        const userProfile = await UserProfile.findOne({
            where: { userId: req.params.userId },
            include: [{ model: User, as: 'user' }]
        });
        if (!userProfile) {
            return res.status(404).json({ error: 'User profile not found' });
        }
        res.status(200).json(userProfile);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Обновить пользователя
exports.updateUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const [updated] = await User.update({ username, email, password }, {
            where: { id: req.params.id }
        });
        if (!updated) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json({ message: 'User updated successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Удалить пользователя
exports.deleteUser = async (req, res) => {
    try {
        const deleted = await User.destroy({
            where: { id: req.params.id }
        });
        if (!deleted) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
exports.deleteUserProfileById = async (req, res) => {
    const userId = req.params.userId;

    try {
        // Попытка найти и удалить профиль
        const deletedProfile = await UserProfile.destroy({
            where: { userId }
        });

        // Проверяем, был ли профиль успешно удален
        if (deletedProfile === 0) {
            return res.status(404).json({ error: 'User profile not found' });
        }

        res.status(200).json({ message: 'User profile deleted successfully' });
    } catch (error) {
        console.error('Error deleting user profile:', error);
        res.status(500).json({ error: 'Failed to delete user profile' });
    }
};
