const jwt = require('jsonwebtoken');

const currentId = (req) => {
    const token = req.headers.authorization;
    const secret = process.env.JWT_SECRET;
    const result = jwt.verify(token, secret);
    return result.data.id;
  };

  module.exports = {
    currentId,
  };