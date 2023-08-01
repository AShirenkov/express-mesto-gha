const router = require('express').Router(); // создали роутер

const {
  getUsers,
  getUserById,
  // createUser,
  getCurrentUser,
  updateProfile,
  updateAvatar,
} = require('../controllers/users');

const {
  checkUserID,
  checkUserAvatar,
  checkUserInfo,
} = require('../middlewares/requestValidation');

router.get('/', getUsers);
router.get('/me', getCurrentUser);
router.get('/:userId', checkUserID, getUserById);
// router.post('/', createUser);
router.patch('/me/avatar', checkUserAvatar, updateAvatar);
router.patch('/me', checkUserInfo, updateProfile);
module.exports = router;
