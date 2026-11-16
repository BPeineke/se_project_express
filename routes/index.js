const router = require('express').Router();
const usersRouter = require('./users');
const clothingItemsRouter = require('./clothingItems');
const auth = require('../middlewares/auth');
const { createUser, login } = require('../controllers/users');
const { getItems } = require('../controllers/clothingItems');
const { NOT_FOUND } = require('../utils/errors');

router.post('/signup', createUser);
router.post('/signin', login);

router.get('/items', getItems);
router.use('/users', auth, usersRouter);
router.use('/items', auth, clothingItemsRouter);

router.use((req, res) => {
  res.status(NOT_FOUND).send({ message: 'Requested resource not found' });
});

module.exports = router;
