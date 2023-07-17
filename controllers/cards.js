const Card = require("../models/card");

module.exports.getCards = (req, res) => {
  Card.find({})
    // возвращаем записанные в базу данные пользователю
    .then((cards) => {
      if (!cards) {
        return res
          .status(404)
          .send({ message: "Запрашиваемые данные отсутствуют" });
      }
      res.status(200).send(cards);
    })

    // если данные не записались, вернём ошибку
    .catch(() => res.status(500).send({ message: "Произошла ошибка" }));
};
module.exports.createCard = (req, res) => {
  // console.log(req.body);
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user })
    .then((card) => res.status(201).send(card))
    .catch((err) => {
      if (err.name === "ValidationError") {
        return res.status(400).send({ message: "Ошибка валидации" });
      }

      res.status(500).send({ message: "Произошла ошибка" });
    });
};

module.exports.deleteCardById = (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.cardId)) {
    return res.status(400).send({ message: "Ошибка валидации" });
  }

  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => {
      if (!card) {
        return res
          .status(404)
          .send({ message: "Запрашиваемые данные отсутствуют" });
      }
      res.send(card);
    })

    .catch(() => res.status(500).send({ message: "Произошла ошибка" }));
};

module.exports.likeCard = (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.cardId)) {
    return res.status(400).send({ message: "Ошибка валидации" });
  }

  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true }
  )
    .then((card) => {
      if (!card) {
        return res
          .status(404)
          .send({ message: "Запрашиваемые данные отсутствуют" });
      }
      res.status(200).send(card);
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        return res.status(400).send({ message: "Ошибка валидации" });
      }

      res.status(500).send({ message: "Произошла ошибка" });
    });
};

module.exports.dislikeCard = (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.cardId)) {
    return res.status(400).send({ message: "Ошибка валидации" });
  }
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true }
  )
    .then((card) => {
      if (!card) {
        return res
          .status(404)
          .send({ message: "Запрашиваемые данные отсутствуют" });
      }
      res.status(200).send(card);
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        return res.status(400).send({ message: "Ошибка валидации" });
      }

      res.status(500).send({ message: "Произошла ошибка" });
    });
};
