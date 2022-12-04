const express = require('express');
const { getAllPosts } = require('../controllers/blogPostController');
const { validateToken } = require('../auth/validateJWT');

const postRouter = express.Router();

postRouter.get('/', validateToken, getAllPosts);

module.exports = postRouter;