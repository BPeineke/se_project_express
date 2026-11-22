const { isCelebrateError } = require("celebrate");
const { HttpError } = require("../errors");
const { BAD_REQUEST, SERVER_ERROR } = require("../utils/errors");

module.exports = (err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }

  if (isCelebrateError(err)) {
    const [validation] = err.details.values();
    return res
      .status(BAD_REQUEST)
      .send({ message: validation?.message || "Invalid request data" });
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
