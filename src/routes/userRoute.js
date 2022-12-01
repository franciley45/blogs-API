const express = require('express');
const { createUser } = require('../controllers/userControler');
const userValidation = require('../middlewares/userValidation');

const userRouter = express.Router();

userRouter.post('/', userValidation, createUser);

module.exports = userRouter;