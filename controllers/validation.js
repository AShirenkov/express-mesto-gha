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

const throwErrorResponse = (err, res) => {
  if (err.name === 'ValidationIdError') {
    return res.status(400).send({
      message: 'Переданы некорректные данные для запроса. Неверный ID',
    });
  }
  return res.status(500).send({ message: 'Произошла ошибка' });
};
// err.name = "RequestError";
module.exports = {
  checkMongoId,
  throwErrorResponse,
};
