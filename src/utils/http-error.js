const HttpError = (message = "Some error occurred", status = 400) => {
  const err = new Error(message);
  err.status = status;
  return err;
};

module.exports = HttpError;
