const Card = require("../models/card");
// getCards,
//   createCard,
//   deleteCardById,
//   likeCard,
//   dislikeCard,

module.exports.getCards = (req, res) => {
  Card.find({})
    // возвращаем записанные в базу данные пользователю
    .then((cards) => res.send(cards))
    // если данные не записались, вернём ошибку
    .catch(() => res.status(500).send({ message: "Произошла ошибка карты 1" }));
};
module.exports.createCard = (req, res) => {
  console.log(req.body);
  const { name, link, owner } = req.body;
  Card.create({ name, link, owner: req.user })
    .then((card) => res.send(card))
    .catch(() => res.status(500).send({ message: "Произошла ошибка карты 2" }));
};

module.exports.deleteCardById = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => res.send(card))
    .catch(() => res.status(500).send({ message: "Произошла ошибка карты 3" }));
};

module.exports.likeCard = (req, _res) =>
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true }
  );

module.exports.dislikeCard = (req, _res) =>
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true }
  );
