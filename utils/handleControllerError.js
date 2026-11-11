const { BAD_REQUEST, NOT_FOUND, SERVER_ERROR } = require('./errors');

module.exports = (res, error, resource) => {
  console.error(error);

  if (error.name === 'CastError') {
    return res.status(BAD_REQUEST).send({ message: `Invalid ${resource} id` });
  }

  if (error.name === 'ValidationError') {
    return res.status(BAD_REQUEST).send({ message: 'Invalid data' });
  }

  if (error.statusCode === NOT_FOUND || error.name === 'DocumentNotFoundError') {
    const resourceName = `${resource[0].toUpperCase()}${resource.slice(1)}`;
    return res.status(NOT_FOUND).send({
      message: error.statusCode === NOT_FOUND ? error.message : `${resourceName} not found`,
    });
  }

  return res.status(SERVER_ERROR).send({
    message: 'An error has occurred on the server.',
  });
};
