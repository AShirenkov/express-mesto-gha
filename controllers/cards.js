// const mongoose = require('mongoose');
const Card = require('../models/card');
const { statusCode } = require('../utils/constants');
const {
  checkMongoId,
  // throwErrorResponse,
  checkObject,
} = require('./validation');

module.exports.getCards = (req, res, next) => {
  Card.find({})

    .then((cards) => res.send(cards))
    .catch(next);
};
module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user })
    .then((card) => res.status(statusCode.created).send(card))
    .catch(next);
};

module.exports.deleteCardById = (req, res, next) => {
  checkMongoId(req.params.cardId)
    .then(() => Card.findByIdAndRemove(req.params.cardId))
    .then((card) => checkObject(card, res))
    .catch(next);
};

module.exports.likeCard = (req, res, next) => {
  checkMongoId(req.params.cardId)
    .then(() => Card.findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
      { new: true },
    ))
    .then((card) => checkObject(card, res))
    .catch(next);
};

module.exports.dislikeCard = (req, res, next) => {
  checkMongoId(req.params.cardId)
    .then(() => Card.findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: req.user._id } }, // убрать _id из массива
      { new: true },
    ))
    .then((card) => checkObject(card, res))
    .catch(next);
};
