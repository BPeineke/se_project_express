const winston = require("winston");
const expressWinston = require("express-winston");

const consoleFormat = winston.format.printf(
  ({ level, message, meta, timestamp }) =>
    `${timestamp} ${level}: ${meta?.stack || message}`
);

const createTransports = (filename) => [
  new winston.transports.Console({
    format: winston.format.combine(winston.format.timestamp(), consoleFormat),
  }),
  new winston.transports.File({
    filename,
    format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.json()
    ),
  }),
];

// Omit headers, query strings, and bodies from both logs.
const requestWhitelist = ["method", "path", "httpVersion"];

const requestLogger = expressWinston.logger({
  transports: createTransports("request.log"),
  requestWhitelist,
  responseWhitelist: ["statusCode"],
  msg: "HTTP {{req.method}} {{req.path}}",
});

const errorLogger = expressWinston.errorLogger({
  transports: createTransports("error.log"),
  requestWhitelist,
  msg: "HTTP {{req.method}} {{req.path}}",
  exceptionToMeta: (err) => {
    // JSON parser errors can quote part of the incoming body in their message.
    if (err.type === "entity.parse.failed") {
      return { name: err.name, message: "Invalid JSON request body" };
    }

    return { name: err.name, message: err.message, stack: err.stack };
  },
});

module.exports = { requestLogger, errorLogger };
