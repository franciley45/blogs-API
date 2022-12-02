const express = require('express');
const { validateToken } = require('../auth/validateJWT');
const category = require('../controllers/categoryController');

const categoryRouter = express.Router();

categoryRouter.post('/', validateToken, category.createCategory);

categoryRouter.get('/', validateToken, category.getCategory);

module.exports = categoryRouter;