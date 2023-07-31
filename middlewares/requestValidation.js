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
    name: Joi.string().required().min(2).max(30),
    avatar: Joi.string().required().min(18), // сделать проверку регуляркой на ссылку
    about: Joi.string().min(2).max(30),
  }),
});
