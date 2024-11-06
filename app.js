const express = require('express');
const morgan = require('morgan');
const tourRouter = require(`${__dirname}/routes/toursRouter.js`);
const userRouter = require(`${__dirname}/routes/userRouter.js`);
const Tour = require(`${__dirname}/model/tourModel.js`);
const app = express();
app.use(morgan('dev')); //comment to log the request in console.
app.use(express.json()); //comment middleware deals with json requst in app.post();
app.use(express.static(`${__dirname}/public`));

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);
//comment we can seperate route from the method too

module.exports = app;
