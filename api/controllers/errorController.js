module.exports.handleErrors = (err, req, res, next) => {
  const { status } = err;

  if (err.code === 11000) {
    return res.status(409).json({ mesage: 'This name already used!' });
  }

  if (status === 400) {
    return res.status(status).json({ mesage: 'Bad request' });
  }

  if (status === 401) {
    return res.status(status).json({ mesage: 'Wrong email or password' });
  }

  if (status === 404) {
    return res.status(status).json({ mesage: 'Not found' });
  }

  return res.status(400).json({ mesage: 'This error is not yet spelled out' });
};
