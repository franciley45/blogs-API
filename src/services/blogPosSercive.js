const { Op } = require('sequelize');
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
  const { data } = req.user;
  const { message } = await getByIdPosts(id);

  if (data.id !== message.userId) return { status: 401, message: 'Unauthorized user' };
  if (!req.body.title || !req.body.content) {
    return { status: 400, message: 'Some required fields are missing' };
  }
  await models.BlogPost.update(req.body,
    { where: { id, userId: data.id } });

  const result = await getByIdPosts(id);

  return { status: 200, message: result.message };
};

const createPost = async (req) => {
  const { title, content, categoryIds } = req.body;
  const { data } = req.user;
 
  if (!title || !content || !categoryIds) {
    return { status: 400, message: 'Some required fields are missing' };
  }

  const allCategories = await models.Category.findAll();
  const checkCategories = categoryIds.every((id, i) => allCategories[i].id === id);

  if (!checkCategories) {
    return { status: 400, message: 'one or more "categoryIds" not found' };
  }

  const result = await models.BlogPost.create({ title, content, userId: data.id });
  await Promise.all(
    categoryIds.map(async (categoryId) => models.PostCategory.create(
      { postId: result.id, categoryId },
    )),
  );
  return { status: 201, message: result };
};

const deletePost = async (userId, id) => {
  const [finById] = await models.BlogPost.findAll({ where: { id } });

  if (!finById) return { status: 404, message: 'Post does not exist' };
  if (finById.userId !== userId) return { status: 401, message: 'Unauthorized user' };

  await models.BlogPost.destroy({ where: { id } });
  return { status: 204 };
};

const getPostsByLIKE = async (busca) => {
  const posts = await models.BlogPost.findAll({
    where: { [Op.or]: [{ 
      title: { [Op.like]: `%${busca}%` }, 
    }, { 
      content: { [Op.like]: `%${busca}%` },
    }] },
    include: [
      { model: models.User, as: 'user', attributes: { exclude: ['password'] } },
      { model: models.Category, as: 'categories', through: { attributes: [] } },
    ],
  });
  if (!posts) return { status: 404, message: 'Post does not exist' };
  return { status: 200, message: posts };
};

module.exports = {
  getAllPosts,
  getByIdPosts,
  updatePost,
  deletePost,
  createPost,
  getPostsByLIKE, 
};