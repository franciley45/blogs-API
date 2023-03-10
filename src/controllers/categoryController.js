const categoryServices = require('../services/categoryService');

const createCategory = async (req, res) => {
  const { name } = req.body;

  const { status, message } = await categoryServices.createCategory(name);
  if (status) return res.status(status).json({ message });

  res.status(201).json(message);
};
 const getCategory = async (_req, res) => {
const result = await categoryServices.getCategory();
return res.status(200).json(result);
 };
module.exports = {
  createCategory,
  getCategory,
};