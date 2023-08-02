const AccessDeniedError = require('../errors/access-denied-error');
const NotFoundError = require('../errors/not-found-error');
const { statusCode } = require('../utils/constants');

// комментарий оставлен,  для  демонстрации примера валидации без joi
/* const checkMongoId = (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return Promise.reject(
      new BadRequestError(
        "Переданы некорректные данные для запроса. Неверный ID"
      )
    );
  }
  return Promise.resolve();
}; */

const checkObject = (obj, res) => {
  if (!obj) {
    return Promise.reject(
      new NotFoundError('Запрашиваемые данные отсутствуют'),
    );
  }

  return res.status(statusCode.ok).send(obj);
};

const checkOwnerCard = (obj, id) => {
  if (!obj) {
    return Promise.reject(
      new NotFoundError('Запрашиваемые данные отсутствуют'),
    );
  }
  if (obj.owner._id.toString() !== id) {
    return Promise.reject(
      new AccessDeniedError('Нет доступа к удалению карточки'),
    );
  }
  return obj;
};

// err.name = "RequestError";
module.exports = {
  checkObject,
  checkOwnerCard,
};
