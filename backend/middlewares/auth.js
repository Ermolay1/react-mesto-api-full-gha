const jwt = require('jsonwebtoken');
const AuthError = require('../errors/AuthError');

// eslint-disable-next-line consistent-return
 const auth = (req, res, next) => {
  const token = req.headers.authorization;
  let payload;
   try {
     payload = jwt.verify(token, Jwt_SECRET);
    } catch (e) {
      next(new AuthError('Необходима авторизация'));
    }
  req.user = payload;
  next();
};
module.exports = auth