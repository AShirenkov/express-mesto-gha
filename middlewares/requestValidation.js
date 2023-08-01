const { celebrate, Joi } = require('celebrate');

const regexUrl = /https?:\/\/(www\.)?[\w\-@]{1,63}\.[a-z0-9]{1,63}[-a-z0-9._~:/?#[\]@!$&'()*+,;=]*#?/i;

module.exports.checkSignin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
});
module.exports.checkSignup = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
    // необязательные дополнительные поля на случай окна регистрации с расширенными возможностями
    name: Joi.string().min(2).max(30),
    avatar: Joi.string().regex(regexUrl),
    about: Joi.string().min(2).max(30),
  }),
});

module.exports.checkUserID = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().regex(/^[0-9a-fA-F]{24}$/),
  }),
});
module.exports.checkUserInfo = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
});
module.exports.checkUserAvatar = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().regex(regexUrl),
  }),
});
module.exports.checkCardID = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().regex(/^[0-9a-fA-F]{24}$/),
  }),
});

module.exports.checkCardID = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().regex(/^[0-9a-fA-F]{24}$/),
  }),
});
module.exports.checkCard = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),

    link: Joi.string().required().regex(regexUrl),
  }),
});
