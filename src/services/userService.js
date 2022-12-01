const jwt = require('jsonwebtoken');
const models = require('../models');

const createUser = async (req) => {
  const { displayName, email, password, image } = req.body;

   const user = await models.User.findOne({ where: { email } });
  if (user) return { status: 409, message: 'User already registered' };

  await models.User.create({ displayName, email, password, image });
  const payload = { email, displayName };
  const token = jwt.sign(payload, process.env.JWT_SECRET);

  return { status: null, message: token };
};

module.exports = {
  createUser,
};