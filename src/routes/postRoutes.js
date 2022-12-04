const express = require('express');
const { getAllPosts, getByIdPosts, updatePost } = require('../controllers/blogPostController');
const { validateToken } = require('../auth/validateJWT');

const postRouter = express.Router();

postRouter.get('/', validateToken, getAllPosts);

postRouter.get('/:id', validateToken, getByIdPosts);

postRouter.put('/:id', validateToken, updatePost);

module.exports = postRouter;