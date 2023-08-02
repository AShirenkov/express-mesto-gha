// const mongoose = require('mongoose');
const BadRequestError = require('../errors/bad-request-error');
const Card = require('../models/card');
const { statusCode } = require('../utils/constants');
const { checkOwnerCard, checkObject } = require('./validation');

module.exports.getCards = (req, res, next) => {
  Card.find({})

    .then((cards) => res.send(cards))
    .catch(next);
};
module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user })
    .then((card) => res.status(statusCode.created).send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Некорректные данные при создании карточки'));
      } else {
        next(err);
      }
    });
};

module.exports.deleteCardById = (req, res, next) => {
  Card.findById(req.params.cardId)
    .then((card) => checkOwnerCard(card, req.user._id))
    .then(() => Card.findByIdAndRemove(req.params.cardId))
    .then((card) => checkObject(card, res))
    .catch(next);
};

module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true },
  )
    .then((card) => checkObject(card, res))
    .catch(next);
};

module.exports.dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true },
  )
    .then((card) => checkObject(card, res))
    .catch(next);
};
