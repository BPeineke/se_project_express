const User = require('../models/User');
const handleControllerError = require('../utils/handleControllerError');

const getUsers = (req, res) => User.find({})
  .then((users) => res.send(users))
  .catch((error) => handleControllerError(res, error, 'user'));

const getUser = (req, res) => User.findById(req.params.userId)
  .orFail(() => {
    const error = new Error('User not found');
    error.statusCode = 404;
    throw error;
  })
  .then((user) => res.send(user))
  .catch((error) => handleControllerError(res, error, 'user'));

const createUser = (req, res) => User.create({
  name: req.body.name,
  avatar: req.body.avatar,
})
  .then((user) => res.status(201).send(user))
  .catch((error) => handleControllerError(res, error, 'user'));

module.exports = {
  getUsers,
  getUser,
  createUser,
};
