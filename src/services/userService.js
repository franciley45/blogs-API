const jwt = require('jsonwebtoken');
const models = require('../models');

const createUser = async (req) => {
  const { displayName, email, password, image } = req.body;
   const user = await models.User.findOne({ where: { email } });
  if (user) return { status: 409, message: 'User already registered' };

     await models.User.create({ displayName, email, password, image });

  const payload = { data: user };
  const token = jwt.sign(payload, process.env.JWT_SECRET);

  return { status: null, message: token };
};

const getUsers = async () => models.User.findAll({ 
      attributes: { exclude: 'password' },
    });

    const getUserById = async (userId) => {
      const [result] = await models.User.findAll({ 
        where: { id: userId },
        attributes: { exclude: 'password' },
      });

      if (result === undefined) return { status: 404, message: 'User does not exist' };

      return { status: null, message: result };
    }; 

module.exports = {
  createUser,
  getUsers,
  getUserById,
};
