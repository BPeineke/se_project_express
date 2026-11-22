const {
  BAD_REQUEST,
  UNAUTHORIZED,
  FORBIDDEN,
  NOT_FOUND,
  CONFLICT,
} = require("../utils/errors");

class HttpError extends Error {
  constructor(statusCode, message) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode;
  }
}

class BadRequestError extends HttpError {
  constructor(message) {
    super(BAD_REQUEST, message);
  }
}

class UnauthorizedError extends HttpError {
  constructor(message) {
    super(UNAUTHORIZED, message);
  }
}

class ForbiddenError extends HttpError {
  constructor(message) {
    super(FORBIDDEN, message);
  }
}

class NotFoundError extends HttpError {
  constructor(message) {
    super(NOT_FOUND, message);
  }
}

class ConflictError extends HttpError {
  constructor(message) {
    super(CONFLICT, message);
  }
}

module.exports = {
  HttpError,
  BadRequestError,
  UnauthorizedError,
  ForbiddenError,
  NotFoundError,
  ConflictError,
};
