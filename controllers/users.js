// const bcrypt = require('bcryptjs');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const {
  checkMongoId,
  throwErrorResponse,
  checkObject,
  checkAvatarRequest,
  checkProfileRequest,
} = require('./validation');
const { statusCode } = require('../utils/constants');

module.exports.getUsers = (req, res) => {
  User.find({})
    // возвращаем записанные в базу данные пользователю
    .then((users) => res.send(users))
    .catch((err) => throwErrorResponse(err, res));
};

module.exports.getUserById = (req, res) => {
  checkMongoId(req.params.userId)
    .then(() => User.findById(req.params.userId))
    .then((user) => checkObject(user, res))
    .catch((err) => throwErrorResponse(err, res));
};

module.exports.getCurrentUser = (req, res) => {
  checkMongoId(req.params.userId)
    .then(() => User.findById(req.params.userId))
    .then((user) => checkObject(user, res))
    .catch((err) => throwErrorResponse(err, res));
};

module.exports.createUser = (req, res) => {
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => User.create({
      email: req.body.email,
      password: hash,
      avatar: req.body.avatar,
      name: req.body.name,
      about: req.body.about,
    }))
    .then((user) => res.status(statusCode.created).send(user))
    .catch((err) => throwErrorResponse(err, res));
};

module.exports.updateProfile = (req, res) => {
  // дополнительная проверка чтобы не переписали этим запросом аватар

  checkProfileRequest(req)
    .then(() => User.findByIdAndUpdate(
      req.user._id,
      req.body,
      // Передадим объект опций:
      {
        new: true, // обработчик then получит на вход обновлённую запись
        runValidators: true, // данные будут валидированы перед изменением
        upsert: false, // если пользователь не найден, он не будет создан
      },
    ))

    .then((user) => checkObject(user, res))
    .catch((err) => throwErrorResponse(err, res));
};

module.exports.updateAvatar = (req, res) => {
  // дополнительная проверка чтобы не переписали этим запросом имя и описание

  checkAvatarRequest(req)
    .then(() => User.findByIdAndUpdate(
      req.user._id,
      req.body,
      // Передадим объект опций:
      {
        new: true, // обработчик then получит на вход обновлённую запись
        runValidators: true, // данные будут валидированы перед изменением
        upsert: false, // если пользователь не найден, он не будет создан
      },
    ))

    .then((user) => checkObject(user, res))
    .catch((err) => throwErrorResponse(err, res));
};
// controllers/users.js

module.exports.login = (req, res) => {
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
    .catch((err) => {
      // ошибка аутентификации
      res.status(401).send({ message: err.message });
    });
};
