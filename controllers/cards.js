// const mongoose = require('mongoose');
const Card = require('../models/card');
const {
  checkMongoId,
  throwErrorResponse,
  checkObject,
} = require('./validation');

module.exports.getCards = (req, res) => {
  Card.find({})
    // возвращаем записанные в базу данные пользователю
    .then((cards) => {
      // if (!cards) {
      //   return res
      //     .status(404)
      //     .send({ message: 'Запрашиваемые данные отсутствуют' });
      // }
      // res.status(200).send(cards);
      checkObject(cards, res);
    })

    .catch((err) => throwErrorResponse(err, res));
  // если данные не записались, вернём ошибку
  // .catch(() => res.status(500).send({ message: "Произошла ошибка" }));
};
module.exports.createCard = (req, res) => {
  // console.log(req.body);
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user })
    .then((card) => res.status(201).send(card))
    .catch((err) => throwErrorResponse(err, res));
  // .catch((err) => {
  //   if (err.name === "ValidationError") {
  //     return res.status(400).send({ message: "Ошибка валидации" });
  //   }

  //   res.status(500).send({ message: "Произошла ошибка" });
  // });
};

module.exports.deleteCardById = (req, res) => {
  // if (!mongoose.Types.ObjectId.isValid(req.params.cardId)) {
  //   return res.status(400).send({ message: "Ошибка валидации" });
  // }
  checkMongoId(req.params.cardId)
    .then(() => Card.findByIdAndRemove(req.params.cardId))
    .then((card) => checkObject(card, res))

    .catch((err) => throwErrorResponse(err, res));
  // .catch(() => res.status(500).send({ message: "Произошла ошибка" }));
};

module.exports.likeCard = (req, res) => {
  // if (!mongoose.Types.ObjectId.isValid(req.params.cardId)) {
  //   return res.status(400).send({ message: "Ошибка валидации" });
  // }
  checkMongoId(req.params.cardId)
    .then(() => Card.findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
      { new: true },
    ))

    .then((card) => checkObject(card, res))
    .catch((err) => throwErrorResponse(err, res));
  // .catch((err) => {
  //   if (err.name === "ValidationError") {
  //     return res.status(400).send({ message: "Ошибка валидации" });
  //   }

  //   res.status(500).send({ message: "Произошла ошибка" });
  // });
};

module.exports.dislikeCard = (req, res) => {
  // if (!mongoose.Types.ObjectId.isValid(req.params.cardId)) {
  //   return res.status(400).send({ message: "Ошибка валидации" });
  // }
  checkMongoId(req.params.cardId)
    .then(() => Card.findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: req.user._id } }, // убрать _id из массива
      { new: true },
    ))

    .then((card) => checkObject(card, res))
    .catch((err) => throwErrorResponse(err, res));
  // .catch((err) => {
  //   if (err.name === "ValidationError") {
  //     return res.status(400).send({ message: "Ошибка валидации" });
  //   }

  //   res.status(500).send({ message: "Произошла ошибка" });
  // });
};
