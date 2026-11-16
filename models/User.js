const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const validator = require("validator");
const { UNAUTHORIZED } = require("../utils/errors");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    required: true,
    validate: {
      validator(value) {
        return validator.isURL(value);
      },
      message: "You must enter a valid URL",
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    validate: {
      validator(value) {
        return validator.isEmail(value);
      },
      message: "You must enter a valid email address",
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

userSchema.statics.findUserByCredentials = function findUserByCredentials(
  email,
  password
) {
  return this.findOne({ email: email.toLowerCase() })
    .select("+password")
    .then((user) => {
      if (!user) {
        const error = new Error("Incorrect email or password");
        error.statusCode = UNAUTHORIZED;
        throw error;
      }

      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          const error = new Error("Incorrect email or password");
          error.statusCode = UNAUTHORIZED;
          throw error;
        }
        return user;
      });
    });
};

module.exports = mongoose.model("user", userSchema);
