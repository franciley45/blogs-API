const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET;

const validateToken = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    const err = { statusCode: 401, message: 'Token not found' };
    return next(err);
  }
  try {
    const result = jwt.verify(token, secret);
    req.user = result;
    next();
  } catch (e) {
    const error = { statusCode: 401, message: 'Expired or invalid token' };
    next(error);
  }
};

module.exports = {
  validateToken,
};