const jwt = require('jsonwebtoken');
const Unauthorized = require('../errors/Unauthorized');
// const { SECRET_KEY } = require('../utils/constants');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  // const token = req.cookies.jwt;
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer')) {
    throw new Unauthorized('Authorization required.');
  }

  const token = authorization.replace('Bearer ', '');

  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
    // payload = jwt.verify(token, SECRET_KEY);
  } catch (err) {
    throw new Unauthorized('Authorization required.');
  }

  req.user = payload;
  next();
};
