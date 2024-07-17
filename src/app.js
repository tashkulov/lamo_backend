const express = require('express');
const userRoutes = require('./routes/userRoutes');
const cors = require('cors'); // Подключаем пакет для работы с CORS

const app = express();
const port = process.env.PORT || 3000;

// Добавляем middleware для разрешения CORS
app.use(cors());
app.use(express.json());
app.use('/api', userRoutes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
