const userService = require('../services/userService');

const createUser = async (req, res) => {
  const { status, message } = await userService.createUser(req);

  if (status) return res.status(status).json({ message });

  return res.status(201).json({ token: message });
};
const getUsers = async (_req, res) => {
  const message = await userService.getUsers();

  return res.status(200).json(message);
}; 
module.exports = {
  createUser,
  getUsers,
};
