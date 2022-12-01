const express = require('express');
const { validateToken } = require('../auth/validateJWT');
/* const validateJWT = require('../auth/validateJWT'); */
const { createUser, getUsers } = require('../controllers/userControler');
const userValidation = require('../middlewares/userValidation');

const userRouter = express.Router();

userRouter.post('/', userValidation, createUser);

userRouter.get('/', validateToken, getUsers);

module.exports = userRouter;