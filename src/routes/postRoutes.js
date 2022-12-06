const express = require('express');
const {
    getAllPosts,
    getByIdPosts,
    updatePost,
    deletePost,
    createPost,
    getPostsByLIKE,
} = require('../controllers/blogPostController');
const { validateToken } = require('../auth/validateJWT');

const postRouter = express.Router();

postRouter.get('/', validateToken, getAllPosts);

postRouter.get('/search', validateToken, getPostsByLIKE);

postRouter.get('/:id', validateToken, getByIdPosts);

postRouter.post('/', validateToken, createPost);

postRouter.put('/:id', validateToken, updatePost);

postRouter.delete('/:id', validateToken, deletePost);

module.exports = postRouter;