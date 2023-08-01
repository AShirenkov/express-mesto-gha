const { celebrate, Joi } = require('celebrate');

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
    name: Joi.string().min(2).max(30),
    avatar: Joi.string().min(18), // сделать проверку регуляркой на ссылку
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
    avatar: Joi.string().min(18), // сделать проверку регуляркой на ссылку
  }),
});
