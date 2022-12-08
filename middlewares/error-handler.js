const { StatusCodes } = require('http-status-codes');

const errorHandler = (err, req, res, next) => {
  // ? customError => is a personalized error handler
  // ? customError { statusCode || msg }
  // * START CUSTOM ERROR HANDLER
  let customError = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || 'Something went wrong try again',
  };

  if (err.code && err.code === 11000) {
    customError.msg = `Duplicate value entered for ${Object.keys(
      err.keyValue
    )} field, please choose another value`;
    customError.statusCode = 400;
  }

  if (err.name === 'ValidationError') {
    customError.msg = Object.values(err.errors)
      .map((item) => item.message)
      .join(', ');
    customError.statusCode = 400;
  }

  if (err.name === 'CastError') {
    customError.msg = `No item found with id : ${err.value}`;
    customError.statusCode = 404;
  }

  // * END CUSTOM ERROR HANDLER
  return res
    .status(customError.statusCode)
    .send({ msg: customError.msg});
};

module.exports = errorHandler;
