module.exports.handleErrors = (err, req, res, next) => {
  const { status } = err;

  if (err.code === 11000) {
    return res.status(409).json({ message: 'This name already used!' });
  }

  if (status === 400) {
    return res.status(status).json({ message: 'Bad request' });
  }

  if (status === 401) {
    return res.status(status).json({ message: 'Wrong email or password' });
  }

  if (status === 404) {
    return res.status(status).json({ message: 'Not found' });
  }

  return res.status(400).json({ message: 'This error is not yet spelled out' });
};
