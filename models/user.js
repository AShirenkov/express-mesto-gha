const mongoose = require("mongoose");
const isEmail = require("validator/lib/isEmail");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    validate: {
      validator: (v) => isEmail(v),
      message: "Неправильный формат почты",
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 2,
  },
  name: {
    // имя пользователя, строка от 2 до 30 символов, обязательное поле;
    type: String,

    minlength: 2,
    maxlength: 30,
    default: "Жак-Ив Кусто",
  },
  about: {
    // информация о пользователе, строка от 2 до 30 символов, обязательное поле;
    type: String,

    minlength: 2,
    maxlength: 30,
    default: "Исследователь",
  },
  avatar: {
    // ссылка на аватарку, строка, обязательное поле.
    type: String,

    default:
      "https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png",
  },
});

module.exports = mongoose.model("user", userSchema);
