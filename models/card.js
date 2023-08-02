const mongoose = require('mongoose');
const isURL = require('validator/lib/isURL');

const cardSchema = new mongoose.Schema({
  name: {
    // имя карточки, строка от 2 до 30 символов, обязательное поле
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  link: {
    // ссылка на картинку, строка, обязательно поле.
    type: String,
    required: true,
    validate: {
      validator: (v) => isURL(v),
      message: 'Неправильный формат ссылки',
    },
  },
  owner: {
    // ссылка на модель автора карточки, тип ObjectId, обязательное поле;
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  likes: [
    {
      // ссылка на модель автора карточки, тип ObjectId, ytобязательное поле;
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
    },
  ],

  createdAt: {
    // дата создания, тип Date, значение по умолчанию Date.now
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('card', cardSchema);
