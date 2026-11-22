const { BadRequestError, ConflictError, NotFoundError } = require("../errors");

module.exports = (error, resource) => {
  if (error.name === "CastError") {
    return new BadRequestError(`Invalid ${resource} id`);
  }

  if (error.name === "ValidationError") {
    return new BadRequestError("Invalid data");
  }

  if (error.code === 11000) {
    return new ConflictError("Email already exists");
  }

  if (error.name === "DocumentNotFoundError") {
    const resourceName = resource[0].toUpperCase() + resource.slice(1);
    return new NotFoundError(`${resourceName} not found`);
  }

  return error;
};
