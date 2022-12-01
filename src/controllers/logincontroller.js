const loginService = require('../services/loginService');

const userLogin = async (req, res) => {
  const { email, password } = req.body;
  const { status, message, token } = await loginService.userLogin(email, password);
  if (message) return res.status(status).json({ message });
  res.status(status).json({ token });
};

module.exports = {
  userLogin,
};