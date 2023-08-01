const router = require('express').Router(); // создали роутер

const {
  getCards,
  createCard,
  deleteCardById,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');
const { checkCardID } = require('../middlewares/requestValidation');

router.get('/', getCards);
router.post('/', createCard);
router.delete('/:cardId', checkCardID, deleteCardById);
router.put('/:cardId/likes', checkCardID, likeCard);
router.delete('/:cardId/likes', checkCardID, dislikeCard);
module.exports = router;
