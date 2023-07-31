const router = require('express').Router(); // создали роутер

const {
  getUsers,
  getUserById,
  // createUser,
  getCurrentUser,
  updateProfile,
  updateAvatar,
} = require('../controllers/users');

router.get('/', getUsers);
router.get('/:userId', getUserById);
// router.post('/', createUser);
router.get('/me', getCurrentUser);
router.patch('/me/avatar', updateAvatar);
router.patch('/me', updateProfile);
module.exports = router;
