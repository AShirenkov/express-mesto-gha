const User = require('../models/user');

module.exports.getUsers = (req, res) => {
  User.find({})
    // возвращаем записанные в базу данные пользователю
    .then((users) => res.send(users))
    // если данные не записались, вернём ошибку
    .catch(() => res.status(500).send({ message: 'Произошла ошибка 1' }));
};

module.exports.getUserById = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => res.send(user))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка 2' }));
};

module.exports.createUser = (req, res) => {
  // console.log(req.body);
  User.create(req.body)
    .then((user) => res.send(user))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка 3' }));
};

module.exports.updateProfile = (req, res) => {
  // console.log(req.body);
  User.findByIdAndUpdate(
    req.user._id,
    req.body,
    // Передадим объект опций:
    {
      new: true, // обработчик then получит на вход обновлённую запись
      runValidators: true, // данные будут валидированы перед изменением
      upsert: false, // если пользователь не найден, он не будет создан
    },
  )
    .then((user) => res.send(user))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка 4' }));
};
