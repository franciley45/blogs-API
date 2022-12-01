const express = require('express');
const login = require('../controllers/logincontroller');

const loginRouter = express.Router();

loginRouter.post('/', login.userLogin);

module.exports = loginRouter;