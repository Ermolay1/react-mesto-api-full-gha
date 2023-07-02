const router = require('express').Router();
const usersController = require('../controllers/users');
const cardsController = require('../controllers/cards');
const NotFoundError = require('../errors/NotFoundError');
const auth = require('../middlewares/auth');
const {
  validateSignUp,
  validateLogin,
  validateUpdateProfile,
  validateUpdateAvatar,
  validateUserId,
  validateCardId,
  validateCreateCard,
} = require('../middlewares/validation');

router.post('/signup', validateSignUp, usersController.createUser);
router.post('/signin', validateLogin, usersController.login);

router.use(auth);

router.get('/users', usersController.getUsers);
router.get('/users/me', usersController.getUserInfo);
router.get('/users/:userId', validateUserId, usersController.getUserById);
router.patch('/users/me', validateUpdateProfile, usersController.updateProfile);
router.patch('/users/me/avatar', validateUpdateAvatar, usersController.updateAvatar);

router.get('/cards', cardsController.getCards);
router.post('/cards', validateCreateCard, cardsController.createCard);
router.delete('/cards/:cardId', validateCardId, cardsController.deleteCardById);
router.put('/cards/:cardId/likes', validateCardId, cardsController.likeCard);
router.delete('/cards/:cardId/likes', validateCardId, cardsController.unlikeCard);

router.use('*', (req, res, next) => {
  next(new NotFoundError('Oops, page was not found. (✖╭╮✖) '));
});

module.exports = router;
