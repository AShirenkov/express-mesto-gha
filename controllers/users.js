// const bcrypt = require('bcryptjs');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const { checkObject } = require('./validation');
const { statusCode } = require('../utils/constants');

const AlreadyExistError = require('../errors/already-exist-error');
const BadRequestError = require('../errors/bad-request-error');

module.exports.getUsers = (req, res, next) => {
  User.find({})
    // возвращаем записанные в базу данные пользователю
    .then((users) => res.send(users))
    .catch(next);
};

module.exports.getUserById = (req, res, next) => {
  User.findById(req.params.userId)
    .then((user) => checkObject(user, res))
    .catch(next);
};

module.exports.getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => checkObject(user, res))
    .catch(next);
};

module.exports.createUser = (req, res, next) => {
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => User.create({
      email: req.body.email,
      password: hash,
      avatar: req.body.avatar,
      name: req.body.name,
      about: req.body.about,
    }))
    .then((user) => res.status(statusCode.created).send({
      email: user.email,
      avatar: user.avatar,
      name: user.name,
      about: user.about,
    }))
    .catch((err) => {
      // проверяем статус и выставляем сообщение в зависимости от него
      if (err.code === 11000) {
        next(new AlreadyExistError('Данные с таким email уже есть в БД'));
      } else if (err.name === 'ValidationError') {
        next(
          new BadRequestError('Некорректные данные при создании пользователя'),
        );
      } else {
        next(err);
      }
    });
};

module.exports.updateProfile = (req, res, next) => {
  // дополнительная проверка чтобы не переписали этим запросом аватар

  User.findByIdAndUpdate(
    req.user._id,
    req.body,
    // Передадим объект опций:
    {
      new: true, // обработчик then получит на вход обновлённую запись
      runValidators: true, // данные будут валидированы перед изменением
      upsert: false, // если пользователь не найден, он не будет создан
    },
  )
    .then((user) => checkObject(user, res))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(
          new BadRequestError(
            'Некорректные данные при обновлении данных пользователя',
          ),
        );
      } else {
        next(err);
      }
    });
};

module.exports.updateAvatar = (req, res, next) => {
  // дополнительная проверка чтобы не переписали этим запросом имя и описание

  User.findByIdAndUpdate(
    req.user._id,
    req.body,
    // Передадим объект опций:
    {
      new: true, // обработчик then получит на вход обновлённую запись
      runValidators: true, // данные будут валидированы перед изменением
      upsert: false, // если пользователь не найден, он не будет создан
    },
  )
    .then((user) => checkObject(user, res))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Некорректные данные при обновлении аватара'));
      } else {
        next(err);
      }
    });
};
// controllers/users.js

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        'some-secret-key',
        { expiresIn: '7d' }, // токен будет просрочен через час после создания
      );
      res.send({ token });
    })
    .catch(next);
};
