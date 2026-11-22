const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const handleControllerError = require("../utils/handleControllerError");
const { JWT_SECRET } = require("../utils/config");
const { NotFoundError, BadRequestError } = require("../errors");

const getCurrentUser = (req, res, next) =>
  User.findById(req.user._id)
    .orFail(() => new NotFoundError("User not found"))
    .then((user) => res.send(user))
    .catch((error) => next(handleControllerError(error, "user")));

const createUser = (req, res, next) => {
  const { name, avatar, email, password } = req.body;

  if (
    typeof email !== "string" ||
    !email ||
    typeof password !== "string" ||
    !password
  ) {
    return next(new BadRequestError("Email and password are required"));
  }

  return bcrypt
    .hash(password, 10)
    .then((hashedPassword) =>
      User.create({
        name,
        avatar,
        email,
        password: hashedPassword,
      })
    )
    .then((user) => {
      const userData = user.toObject();
      delete userData.password;
      return res.status(201).send(userData);
    })
    .catch((error) => next(handleControllerError(error, "user")));
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  if (
    typeof email !== "string" ||
    !email ||
    typeof password !== "string" ||
    !password
  ) {
    return next(new BadRequestError("Email and password are required"));
  }

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: "7d",
      });
      return res.send({ token });
    })
    .catch((error) => next(handleControllerError(error, "user")));
};

const updateCurrentUser = (req, res, next) => {
  const updates = {};
  ["name", "avatar"].forEach((field) => {
    if (Object.prototype.hasOwnProperty.call(req.body, field)) {
      updates[field] = req.body[field];
    }
  });

  return User.findByIdAndUpdate(
    req.user._id,
    { $set: updates },
    { new: true, runValidators: true }
  )
    .orFail(() => new NotFoundError("User not found"))
    .then((user) => res.send(user))
    .catch((error) => next(handleControllerError(error, "user")));
};

module.exports = {
  createUser,
  login,
  getCurrentUser,
  updateCurrentUser,
};
