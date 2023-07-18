// const mongoose = require('mongoose');
const Card = require('../models/card');
const { statusCode } = require('../utils/constants');
const {
  checkMongoId,
  throwErrorResponse,
  checkObject,
} = require('./validation');

module.exports.getCards = (req, res) => {
  Card.find({})

    .then((cards) => checkObject(cards, res))
    .catch((err) => throwErrorResponse(err, res));
};
module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user })
    .then((card) => res.status(statusCode.created).send(card))
    .catch((err) => throwErrorResponse(err, res));
};

module.exports.deleteCardById = (req, res) => {
  checkMongoId(req.params.cardId)
    .then(() => Card.findByIdAndRemove(req.params.cardId))
    .then((card) => checkObject(card, res))
    .catch((err) => throwErrorResponse(err, res));
};

module.exports.likeCard = (req, res) => {
  checkMongoId(req.params.cardId)
    .then(() => Card.findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
      { new: true },
    ))
    .then((card) => checkObject(card, res))
    .catch((err) => throwErrorResponse(err, res));
};

module.exports.dislikeCard = (req, res) => {
  checkMongoId(req.params.cardId)
    .then(() => Card.findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: req.user._id } }, // убрать _id из массива
      { new: true },
    ))
    .then((card) => checkObject(card, res))
    .catch((err) => throwErrorResponse(err, res));
};
