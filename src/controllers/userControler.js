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

const getUserById = async (req, res) => {
const { id } = req.params;
const { status, message } = await userService.getUserById(id);

if (status) return res.status(status).json({ message });

return res.status(200).json(message);
};
const deleteUser = async (req, res) => {
await userService.deleteUser(req);
return res.status(204).json();
};
module.exports = {
  createUser,
  getUsers,
  getUserById,
  deleteUser,
};
