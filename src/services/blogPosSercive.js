const { currentId } = require('../auth/currentId');
const models = require('../models');

const getAllPosts = async () => {
  const posts = await models.BlogPost.findAll({
    include: [{ model: models.User, as: 'user', attributes: { exclude: ['password'] } },
    { model: models.Category, as: 'categories' }],
  });

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

const updatePost = async (req, id) => {
  const userID = currentId(req);
  const { message } = await getByIdPosts(id);

  if (userID !== message.userId) return { status: 401, message: 'Unauthorized user' };
  if (!req.body.title || !req.body.content) {
    return { status: 400, message: 'Some required fields are missing' };
  }
  await models.BlogPost.update(req.body,
    { where: { id, userId: userID } });

  const result = await getByIdPosts(id);

  return { status: 200, message: result.message };
};

module.exports = {
  getAllPosts,
  getByIdPosts,
  updatePost,
};