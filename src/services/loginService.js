const jwt = require('jsonwebtoken');
const models = require('../models');

const isBodyValid = (email, password) => email && password;

const jwtConfig = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

const userLogin = async (email, password) => {
  if (!isBodyValid(email, password)) {
    return { status: 400, message: 'Some required fields are missing' };
  }

  const user = await models.User.findOne({ where: { email } });
  if (!user || password !== user.dataValues.password) { 
    return { status: 400, message: 'Invalid fields' }; 
  }

  const payload = { data: user };
  const token = jwt.sign(payload, process.env.JWT_SECRET, jwtConfig);
  return { status: 200, token };
};

module.exports = {
  userLogin,
};