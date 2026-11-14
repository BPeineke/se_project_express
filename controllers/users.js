const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const handleControllerError = require('../utils/handleControllerError');
const { JWT_SECRET } = require('../utils/config');
const { NOT_FOUND, BAD_REQUEST } = require('../utils/errors');

const getCurrentUser = (req, res) => User.findById(req.user._id)
  .orFail(() => {
    const error = new Error('User not found');
    error.statusCode = NOT_FOUND;
    throw error;
  })
  .then((user) => res.send(user))
  .catch((error) => handleControllerError(res, error, 'user'));

const createUser = (req, res) => {
  const { name, avatar, email, password } = req.body;

  if (!email || !password) {
    const error = new Error('Email and password are required');
    error.statusCode = BAD_REQUEST;
    return handleControllerError(res, error, 'user');
  }

  return bcrypt.hash(password, 10)
    .then((hashedPassword) => User.create({
      name,
      avatar,
      email,
      password: hashedPassword,
    }))
    .then((user) => {
      const userData = user.toObject();
      delete userData.password;
      return res.status(201).send(userData);
    })
    .catch((error) => handleControllerError(res, error, 'user'));
};

const login = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    const error = new Error('Email and password are required');
    error.statusCode = BAD_REQUEST;
    return handleControllerError(res, error, 'user');
  }

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: '7d' });
      return res.send({ token });
    })
    .catch((error) => handleControllerError(res, error, 'user'));
};

const updateCurrentUser = (req, res) => {
  const updates = {};
  ['name', 'avatar'].forEach((field) => {
    if (Object.prototype.hasOwnProperty.call(req.body, field)) {
      updates[field] = req.body[field];
    }
  });

  return User.findByIdAndUpdate(
    req.user._id,
    { $set: updates },
    { new: true, runValidators: true },
  )
    .orFail(() => {
      const error = new Error('User not found');
      error.statusCode = NOT_FOUND;
      throw error;
    })
    .then((user) => res.send(user))
    .catch((error) => handleControllerError(res, error, 'user'));
};

module.exports = {
  createUser,
  login,
  getCurrentUser,
  updateCurrentUser,
};
