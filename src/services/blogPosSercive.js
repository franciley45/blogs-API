const models = require('../models');

const getAllPosts = async () => {
  const posts = await models.BlogPost.findAll({
    include: [{ model: models.User, as: 'user', attributes: { exclude: ['password'] } },
    { model: models.Category, as: 'categories' }],
  });
  console.log('aquiiii', posts);
  return {
    status: 200, posts,
  };
};

const getByIdPosts = async (id) => {
  const [posts] = await models.BlogPost.findAll({
    where: { id },
    include: [{
      model: models
        .User,
      as: 'user',

      attributes: { exclude: ['password'] },
    },
    { model: models.Category, as: 'categories' }],
  });

  if (posts === undefined) return { status: 404, message: 'Post does not exist' };
  
  return {
    status: 200, message: posts,
  };
};

module.exports = {
  getAllPosts,
  getByIdPosts,
};