require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const { NODE_ENV } = require('./config');
const { CLIENT_ORIGIN } = require('./config');

const usersRouter = require('./users/users-router');
const authRouter = require('./auth/auth-router');
const categoriesRouter = require('./categories/categories-router');
const recipesRouter = require('./recipes/recipes-router');

const app = express();
const morganSetting = process.env.NODE_ENV === 'production' ? 'tiny' : 'common';
app.use(morgan(morganSetting));
app.use(
    cors({
        origin: CLIENT_ORIGIN
    })
);
app.use(helmet());

app.use(`/api/users`, usersRouter);
app.use(`/api/auth`, authRouter);
app.use(`/api/categories`, categoriesRouter);
app.use(`/api/recipes`, recipesRouter);

app.use(function errorHandler(error, req, res, next) {
    let response;
    if (NODE_ENV === 'production') {
        response = { error: { message: 'server error' } };
    } else {
        response = { message: error.message, error };
    };
    res.status(500).json(response);
});

module.exports = app;