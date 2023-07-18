const mongoose = require('mongoose');
const { statusCode } = require('../utils/constants');

const checkMongoId = (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    const err = new Error();
    err.name = 'ValidationIdError';
    return Promise.reject(err);
  }
  return Promise.resolve();
};

const checkObject = (obj, res) => {
  if (!obj) {
    const err = new Error();
    err.name = 'RequestError';
    return Promise.reject(err);
  }

  return res.status(statusCode.ok).send(obj);
};

const checkProfileRequest = (req) => {
  if (req.body.avatar || !(req.body.name && req.body.about)) {
    const err = new Error();
    err.name = 'ValidationAvatarError';
    return Promise.reject(err);
  }
  return Promise.resolve();
};
const checkAvatarRequest = (req) => {
  if (!req.body.avatar || req.body.name || req.body.about) {
    const err = new Error();
    err.name = 'ValidationProfileError';
    return Promise.reject(err);
  }
  return Promise.resolve();
};

const throwErrorResponse = (err, res) => {
  if (err.name === 'ValidationIdError') {
    return res.status(statusCode.badRequest).send({
      message: 'Переданы некорректные данные для запроса. Неверный ID',
    });
  }
  if (err.name === 'ValidationError') {
    return res.status(statusCode.badRequest).send({
      message: 'Ошибка валидации данных',
    });
  }
  if (err.name === 'ValidationProfileError') {
    return res.status(statusCode.badRequest).send({
      message: 'Некорректный запрос на обновление профиля',
    });
  }
  if (err.name === 'ValidationAvatarError') {
    return res.status(statusCode.badRequest).send({
      message: 'Некорректный зароос на обновление аватара',
    });
  }
  if (err.name === 'RequestError') {
    return res.status(statusCode.notFound).send({
      message: 'Запрашиваемые данные отсутствуют',
    });
  }
  return res
    .status(statusCode.internalServerError)
    .send({ message: 'Произошла ошибка' });
};
// err.name = "RequestError";
module.exports = {
  checkMongoId,
  throwErrorResponse,
  checkObject,
  checkAvatarRequest,
  checkProfileRequest,
};
