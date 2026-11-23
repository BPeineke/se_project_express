const { HttpError } = require("../errors");
const { SERVER_ERROR } = require("../utils/errors");

module.exports = (err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }

  if (err instanceof HttpError) {
    return res.status(err.statusCode).send({ message: err.message });
  }

  // Express's body parser attaches HTTP status codes to client errors.
  if (Number.isInteger(err.status) && err.status >= 400 && err.status < 500) {
    return res.status(err.status).send({
      message: err.expose ? err.message : "Invalid request",
    });
  }

  return res.status(SERVER_ERROR).send({
    message: "An error has occurred on the server.",
  });
};
