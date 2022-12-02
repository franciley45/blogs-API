const express = require('express');
const { validateToken } = require('../auth/validateJWT');

const controllers = require('../controllers/userControler');
const userValidation = require('../middlewares/userValidation');

const userRouter = express.Router();

userRouter.post('/', userValidation, controllers.createUser);

userRouter.get('/', validateToken, controllers.getUsers);

userRouter.get('/:id', validateToken, controllers.getUserById);

module.exports = userRouter;