const User = require('../models/user');
const {
  checkMongoId,
  throwErrorResponse,
  checkObject,
  checkAvatarRequest,
  checkProfileRequest,
} = require('./validation');

module.exports.getUsers = (req, res) => {
  User.find({})
    // возвращаем записанные в базу данные пользователю
    .then((users) => checkObject(users, res))
    .catch((err) => throwErrorResponse(err, res));
};

module.exports.getUserById = (req, res) => {
  checkMongoId(req.params.userId)
    .then(() => User.findById(req.params.userId))
    .then((user) => checkObject(user, res))
    .catch((err) => throwErrorResponse(err, res));
};

module.exports.createUser = (req, res) => {
  User.create(req.body)
    .then((user) => res.status(201).send(user))
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
