const express = require('express');
const { getAllPosts, getByIdPosts } = require('../controllers/blogPostController');
const { validateToken } = require('../auth/validateJWT');

const postRouter = express.Router();

postRouter.get('/', validateToken, getAllPosts);

postRouter.get('/:id', validateToken, getByIdPosts);

module.exports = postRouter;