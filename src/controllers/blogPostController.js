const postService = require('../services/blogPosSercive');

const getAllPosts = async (req, res) => {
    const { status, posts } = await postService.getAllPosts();
    res.status(status).json(posts);
  };

  module.exports = {
    getAllPosts,
  };