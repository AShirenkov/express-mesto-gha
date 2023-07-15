const User = require("../models/user");

module.exports.getUsers = (req, res) => {
  User.find({})
    // возвращаем записанные в базу данные пользователю
    .then((users) => res.send(users))
    // если данные не записались, вернём ошибку
    .catch((err) => res.status(500).send({ message: "Произошла ошибка 1" }));
};

module.exports.getUserById = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => res.send(user))
    .catch((err) => res.status(500).send({ message: "Произошла ошибка 2" }));
};

module.exports.createUser = (req, res) => {
  User.create(req.body)
    .then((user) => res.send(user))
    .catch((err) => res.status(500).send({ message: "Произошла ошибка 3" }));
};
