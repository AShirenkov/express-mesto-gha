const router = require('express').Router();

const routerUsers = require('../routes/users');
const routerCards = require('../routes/cards');

const auth = require('./auth');
const NotFoundError = require('../errors/not-found-error');
const { createUser, login } = require('../controllers/users');
const { checkSignin, checkSignup } = require('./requestValidation');

router.post('/signin', checkSignin, login);
router.post('/signup', checkSignup, createUser);
router.use(auth);

router.use('/users', routerUsers); // запускаем
router.use('/cards', routerCards); // запускаем
router.use('/', (req, res, next) => {
  next(new NotFoundError('Такого адреса не существует'));
});

module.exports = router;
