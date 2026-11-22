const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../utils/config");
const { UnauthorizedError } = require("../errors");
const { objectId } = require("./validation");

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    return next(new UnauthorizedError("Authorization required"));
  }

  const token = authorization.slice(7);

  try {
    req.user = jwt.verify(token, JWT_SECRET);
  } catch {
    return next(new UnauthorizedError("Authorization required"));
  }
  if (objectId.validate(req.user?._id).error) {
    return next(new UnauthorizedError("Authorization required"));
  }
  return next();
};
