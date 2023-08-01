const express = require('express');

const bodyParser = require('body-parser');
// Слушаем 3000 порт
const mongoose = require('mongoose');

const { errors } = require('celebrate');
const routerUsers = require('./routes/users'); // импортируем роутер

const routerCards = require('./routes/cards'); // импортируем роутер

const { createUser, login } = require('./controllers/users');
const auth = require('./middlewares/auth');

const NotFoundError = require('./errors/not-found-error');
const { checkSignin, checkSignup } = require('./middlewares/requestValidation');

const { PORT = 3000 } = process.env;

// подключаемся к серверу mongo
mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {});

const app = express();
app.use(bodyParser.json()); // для собирания JSON-формата
app.use(bodyParser.urlencoded({ extended: true })); // для приёма веб-страниц внутри POST-запроса
// app.use((req, res, next) => {
//   req.user = {
//     _id: "64b3d42e3c656c07033d984a",
//   };

//   next();
// });

app.post('/signin', checkSignin, login);
app.post('/signup', checkSignup, createUser);
app.use(auth);

app.use('/users', routerUsers); // запускаем
app.use('/cards', routerCards); // запускаем
app.use('/', (req, res, next) => {
  next(new NotFoundError('Nакого адреса не существует'));
});
app.use(errors());
app.use((err, req, res, next) => {
  // если у ошибки нет статуса, выставляем 500
  const { statusCode = 500, message } = err;

  res.status(statusCode).send({
    // проверяем статус и выставляем сообщение в зависимости от него
    message: statusCode === 500 ? 'На сервере произошла ошибка' : message,
  });
  return next();
});

app.listen(PORT, () => {
  // Если всё работает, консоль покажет, какой порт приложение слушает
  console.log(`App listening on port ${PORT}`);
});
