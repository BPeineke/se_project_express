const HttpError = require("./http-error");
const { FORBIDDEN } = require("../utils/errors");

class ForbiddenError extends HttpError {
  constructor(message) {
    super(FORBIDDEN, message);
  }
}

module.exports = ForbiddenError;
