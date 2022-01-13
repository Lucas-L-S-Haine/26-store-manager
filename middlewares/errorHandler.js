const handleError = (err, req, res, _next) => {
  if (err.status) {
    console.log('error middleware', err);
    return res.status(err.status).json({ err: { code: 'invalid_data', message: err.message } });
  }
  return res.status(500).json({ message: 'Internal Server Error' });
};

module.exports = handleError;
