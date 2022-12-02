require('express-async-errors');
const express = require('express');
const loginroutes = require('./routes/loginRoute');
const userRouter = require('./routes/userRoute');
const errorHandler = require('./middlewares/errorHandler');
const categoryRouter = require('./routes/categoryRoute');
// ...

const app = express();

app.use(express.json());
app.use('/login', loginroutes);
app.use('/user', userRouter);
app.use('/categories', categoryRouter);
app.use(errorHandler);

// ...

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
