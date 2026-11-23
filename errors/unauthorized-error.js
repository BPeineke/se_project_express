const HttpError = require("./http-error");
const { UNAUTHORIZED } = require("../utils/errors");

class UnauthorizedError extends HttpError {
  constructor(message) {
    super(UNAUTHORIZED, message);
  }
}

module.exports = UnauthorizedError;
