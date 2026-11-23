const HttpError = require("./http-error");
const { BAD_REQUEST } = require("../utils/errors");

class BadRequestError extends HttpError {
  constructor(message) {
    super(BAD_REQUEST, message);
  }
}

module.exports = BadRequestError;
