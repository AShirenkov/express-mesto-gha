const router = require('express').Router(); // создали роутер

const {
  getUsers,
  getUserById,
  createUser,
  updateProfile,
} = require('../controllers/users');

router.get('/', getUsers);
router.get('/:userId', getUserById);
router.post('/', createUser);
router.patch('/me/avatar', updateProfile);
router.patch('/me', updateProfile);
module.exports = router;
