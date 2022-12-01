const userService = require('../services/userService');

const createUser = async (req, res) => {
  const { status, message } = await userService.createUser(req);

  if (status) return res.status(status).json({ message });

  return res.status(201).json({ token: message });
};

module.exports = {
  createUser,
};
