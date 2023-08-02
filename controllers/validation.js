const mongoose = require("mongoose");
const AccessDeniedError = require("../errors/access-denied-error");

const BadRequestError = require("../errors/bad-request-error");
const NotFoundError = require("../errors/not-found-error");
const { statusCode } = require("../utils/constants");

//комментарий оставлен,  для  демонстрации примера валидации без joi
/*const checkMongoId = (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return Promise.reject(
      new BadRequestError(
        "Переданы некорректные данные для запроса. Неверный ID"
      )
    );
  }
  return Promise.resolve();
};*/

const checkObject = (obj, res) => {
  if (!obj) {
    return Promise.reject(
      new NotFoundError("Запрашиваемые данные отсутствуют")
    );
  }

  return res.status(statusCode.ok).send(obj);
};

const checkOwnerCard = (obj, id) => {
  if (!obj) {
    return Promise.reject(
      new NotFoundError("Запрашиваемые данные отсутствуют")
    );
  }
  if (obj.owner._id.toString() !== id) {
    return Promise.reject(
      new AccessDeniedError("Нет доступа к удалению карточки")
    );
  }
  return obj;
};

const checkProfileRequest = (req) => {
  if (req.body.avatar || !(req.body.name && req.body.about)) {
    return Promise.reject(
      new BadRequestError("Некорректный запрос на обновление профиля")
    );
  }
  return Promise.resolve();
};
const checkAvatarRequest = (req) => {
  if (!req.body.avatar || req.body.name || req.body.about) {
    return Promise.reject(
      new BadRequestError("Некорректный зароос на обновление аватара")
    );
  }
  return Promise.resolve();
};

const throwErrorResponse = (err, res) => {
  if (err.name === "ValidationIdError") {
    return res.status(statusCode.badRequest).send({
      message: "Переданы некорректные данные для запроса. Неверный ID",
    });
  }
  if (err.name === "ValidationError") {
    return res.status(statusCode.badRequest).send({
      message: "Ошибка валидации данных",
    });
  }
  if (err.name === "ValidationProfileError") {
    return res.status(statusCode.badRequest).send({
      message: "Некорректный запрос на обновление профиля",
    });
  }
  if (err.name === "ValidationAvatarError") {
    return res.status(statusCode.badRequest).send({
      message: "Некорректный зароос на обновление аватара",
    });
  }
  if (err.name === "RequestError") {
    return res.status(statusCode.notFound).send({
      message: "Запрашиваемые данные отсутствуют",
    });
  }
  return res
    .status(statusCode.internalServerError)
    .send({ message: "Произошла ошибка" });
};
// err.name = "RequestError";
module.exports = {
  throwErrorResponse,
  checkObject,
  checkAvatarRequest,
  checkProfileRequest,
  checkOwnerCard,
};
