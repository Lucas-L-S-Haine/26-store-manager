const handleError = (err, req, res, _next) => {
  if (err.status) {
    return res.status(err.status)
      .json({ err: { code: 'invalid_data', message: err.message } });
  }
  const error = {
    err: {
      code: 'not_found',
      message: 'Sale not found',
      status: 404,
    },
  };
  return res.status(error.err.status).json(error);
};

module.exports = handleError;
