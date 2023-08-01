const jwt = require("jsonwebtoken");
const AuthError = require("../errors/auth-error");

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  //console.log("тест");
  if (!authorization || !authorization.startsWith("Bearer ")) {
    return next(new AuthError("Необходима авторизация"));
  }

  const token = authorization.replace("Bearer ", "");
  let payload;

  try {
    payload = jwt.verify(token, "some-secret-key");
  } catch (err) {
    return next(new AuthError("Необходима авторизация"));
  }

  req.user = payload; // записываем пейлоуд в объект запроса
  //console.log(req.user._id);

  return next(); // пропускаем запрос дальше
};
