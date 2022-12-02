const models = require('../models');

const createCategory = async (name) => {
    if (!name) return { status: 400, message: '"name" is required' };

    const result = await models.Category.create({ name });
  
       return { status: null, message: result };
  };

  module.exports = {
   createCategory,
  };