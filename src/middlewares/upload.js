// middlewares/upload.js

const multer = require('multer');
const path = require('path');

// Настраиваем хранилище для загруженных файлов
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Уникальное имя файла
    }
});

const upload = multer({ storage });

module.exports = upload;
