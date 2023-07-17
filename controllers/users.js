const User = require('../models/user');

module.exports.getUsers = (req, res) => {
  User.find({})
    // возвращаем записанные в базу данные пользователю
    .then((users) => {
      if (!users) {
        return res
          .status(404)
          .send({ message: 'Запрашиваемые данные отсутствуют' });
      }
      res.status(200).send(users);
    })
    // если данные не записались, вернём ошибку
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

module.exports.getUserById = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        return res
          .status(404)
          .send({ message: 'Запрашиваемые данные отсутствуют' });
      }
      res.status(200).send(user);
    })
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

module.exports.createUser = (req, res) => {
  // console.log(req.body);
  User.create(req.body)
    .then((user) => res.status(201).send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({ message: 'Ошибка валидации' });
      }

      res.status(500).send({ message: 'Произошла ошибка' });
    });
};

module.exports.updateProfile = (req, res) => {
  // console.log(req.body);
  // console.log(req.body.name);
  // дополнительная проверка чтобы не переписали этим запросом аватар
  if (req.body.avatar || !(req.body.name && req.body.about)) {
    res.status(400).send({ message: 'Ошибка валидации' });
    return;
  }
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
    .then((user) => {
      if (!user) {
        return res
          .status(404)
          .send({ message: 'Запрашиваемые данные отсутствуют' });
      }
      res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({ message: 'Ошибка валидации 1' });
      }

      res.status(500).send({ message: 'Произошла ошибка' });
    });
};

module.exports.updateAvatar = (req, res) => {
  // console.log(req.body);
  console.log(req.body.name);
  // дополнительная проверка чтобы не переписали этим запросом имя и описание
  if (!req.body.avatar || req.body.name || req.body.about) {
    res.status(400).send({ message: 'Ошибка валидации' });
    return;
  }
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
    .then((user) => {
      if (!user) {
        return res
          .status(404)
          .send({ message: 'Запрашиваемые данные отсутствуют' });
      }
      res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({ message: 'Ошибка валидации' });
      }

      res.status(500).send({ message: 'Произошла ошибка' });
    });
};
