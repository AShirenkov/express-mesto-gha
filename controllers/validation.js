const mongoose = require('mongoose');

const checkMongoId = (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    const err = new Error();
    err.name = 'ValidationIdError';
    return Promise.reject(err);

    // return res.status(400).send({ message: "Ошибка валидации" });
  }
  return Promise.resolve();
};

const checkObject = (obj) => {
  if (!obj) {
    const err = new Error();
    err.name = 'RequestError';
    return Promise.reject(err);
  }

  return res.status(200).send(obj);
};

const throwErrorResponse = (err, res) => {
  if (err.name === 'ValidationIdError') {
    return res.status(400).send({
      message: 'Переданы некорректные данные для запроса. Неверный ID',
    });
  }
  if (err.name === 'ValidationError') {
    return res.status(400).send({
      message: 'Ошибка валидации данных',
    });
  }
  if (err.name === 'RequestError') {
    return res.status(404).send({
      message: 'Запрашиваемые данные отсутствуют',
    });
  }
  return res.status(500).send({ message: 'Произошла ошибка' });
};
// err.name = "RequestError";
module.exports = {
  checkMongoId,
  throwErrorResponse,
  checkObject,
};
