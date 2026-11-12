const express = require('express');
const mongoose = require('mongoose');
const usersRouter = require('./routes/users');
const clothingItemsRouter = require('./routes/clothingItems');

const { PORT = 63900 } = process.env;
const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/wtwr_db');

app.use(express.json());

// Temporary authorization until the next project sprint.
app.use((req, res, next) => {
  req.user = {
    _id: '6af44ae9522bbd08c810f65b',
  };
  next();
});

app.use('/users', usersRouter);
app.use('/items', clothingItemsRouter);

app.use((req, res) => {
  res.status(404).send({ message: 'Requested resource not found' });
});

const server = app.listen(PORT, () => {
  console.log(`App listening at port ${server.address().port}`);
});
