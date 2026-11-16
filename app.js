const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const usersRouter = require('./routes/users');
const clothingItemsRouter = require('./routes/clothingItems');
const auth = require('./middlewares/auth');
const { createUser, login } = require('./controllers/users');
const { NOT_FOUND } = require('./utils/errors');

const {
  PORT = 3001,
  MONGODB_URI = 'mongodb://127.0.0.1:27017/wtwr_db',
} = process.env;
const app = express();

mongoose.connect(MONGODB_URI);

app.use(express.json());
app.use(cors());

app.post('/signup', createUser);
app.post('/signin', login);

app.use('/users', auth, usersRouter);
app.use('/items', (req, res, next) => {
  if (req.method === 'GET' && req.path === '/') {
    return next();
  }
  return auth(req, res, next);
});
app.use('/items', clothingItemsRouter);

app.use((req, res) => {
  res.status(NOT_FOUND).send({ message: 'Requested resource not found' });
});

const server = app.listen(PORT, () => {
  console.log(`App listening at port ${server.address().port}`);
});

