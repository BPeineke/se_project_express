const HttpError = require("./http-error");
const { CONFLICT } = require("../utils/errors");

class ConflictError extends HttpError {
  constructor(message) {
    super(CONFLICT, message);
  }
}

module.exports = ConflictError;
