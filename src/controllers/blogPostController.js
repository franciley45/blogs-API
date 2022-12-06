const postService = require('../services/blogPosSercive');

const getAllPosts = async (req, res) => {
  const { status, posts } = await postService.getAllPosts();
  res.status(status).json(posts);
};
const getByIdPosts = async (req, res) => {
  const { id } = req.params;

  const { status, message } = await postService.getByIdPosts(id);
  if (status === 404) return res.status(status).json({ message });

  res.status(status).json(message);
};

const updatePost = async (req, res) => {
  const { id } = req.params;

  const { status, message } = await postService.updatePost(req, id);
  if (status === 400 || status === 401) return res.status(status).json({ message });

  res.status(status).json(message);
};

const deletePost = async (req, res) => {
  const { id } = req.params;
  const { data } = req.user;
 
  const { status, message } = await postService.deletePost(data.id, id);
  if (status === 404 || status === 401) return res.status(status).json({ message });
   res.status(status).json();
};
const createPost = async (req, res) => {
const { status, message } = await postService.createPost(req);
if (status === 400) return res.status(status).json({ message });
res.status(status).json(message);
};

module.exports = {
  getAllPosts,
  getByIdPosts,
  updatePost,
  deletePost,
  createPost,
};