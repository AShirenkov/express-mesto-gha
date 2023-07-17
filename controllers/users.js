const User = require("../models/user");
const {
  checkMongoId,
  throwErrorResponse,
  checkObject,
} = require("./validation");

module.exports.getUsers = (req, res) => {
  User.find({})
    // возвращаем записанные в базу данные пользователю
    .then((users) => {
      checkObject(users, res);
    })
    .catch((err) => throwErrorResponse(err, res));
};

module.exports.getUserById = (req, res) => {
  checkMongoId(req.params.userId)
    .then(() => User.findById(req.params.userId))
    .then((user) => {
      checkObject(user, res);
      // if (!user) {
      //   return res
      //     .status(404)
      //     .send({ message: "Запрашиваемые данные отсутствуют" });
      // }
      // return res.status(200).send(user);
    })
    .catch((err) => throwErrorResponse(err, res));
};

module.exports.createUser = (req, res) => {
  User.create(req.body)
    .then((user) => res.status(201).send(user))
    .catch((err) => throwErrorResponse(err, res));
};

module.exports.updateProfile = (req, res) => {
  // дополнительная проверка чтобы не переписали этим запросом аватар
  if (req.body.avatar || !(req.body.name && req.body.about)) {
    return res.status(400).send({ message: "Ошибка валидации" });
  }
  User.findByIdAndUpdate(
    req.user._id,
    req.body,
    // Передадим объект опций:
    {
      new: true, // обработчик then получит на вход обновлённую запись
      runValidators: true, // данные будут валидированы перед изменением
      upsert: false, // если пользователь не найден, он не будет создан
    }
  )
    .then((user) => {
      checkObject(user, res);
    })
    .catch((err) => throwErrorResponse(err, res));
};

module.exports.updateAvatar = (req, res) => {
  // console.log(req.body);
  console.log(req.body.name);
  // дополнительная проверка чтобы не переписали этим запросом имя и описание
  if (!req.body.avatar || req.body.name || req.body.about) {
    return res.status(400).send({ message: "Ошибка валидации" });
  }
  User.findByIdAndUpdate(
    req.user._id,
    req.body,
    // Передадим объект опций:
    {
      new: true, // обработчик then получит на вход обновлённую запись
      runValidators: true, // данные будут валидированы перед изменением
      upsert: false, // если пользователь не найден, он не будет создан
    }
  )
    .then((user) => {
      checkObject(user, res);
    })
    .catch((err) => throwErrorResponse(err, res));
};
