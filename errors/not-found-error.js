const HttpError = require("./http-error");
const { NOT_FOUND } = require("../utils/errors");

class NotFoundError extends HttpError {
  constructor(message) {
    super(NOT_FOUND, message);
  }
}

module.exports = NotFoundError;
