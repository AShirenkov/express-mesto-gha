const express = require('express');

const bodyParser = require('body-parser');
// Слушаем 3000 порт
const mongoose = require('mongoose');
const router = require('./routes/users.js'); // импортируем роутер

const { PORT = 3000 } = process.env;

const app = express();
app.use(bodyParser.json()); // для собирания JSON-формата
app.use(bodyParser.urlencoded({ extended: true })); // для приёма веб-страниц внутри POST-запроса
app.use((req, res, next) => {
  req.user = {
    _id: '64b3d42e3c656c07033d984a',
  };

  next();
});

app.use('/users', router); // запускаем

// подключаемся к серверу mongo
mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {});

app.listen(PORT, () => {
  // Если всё работает, консоль покажет, какой порт приложение слушает
  console.log(`App listening on port ${PORT}`);
});
