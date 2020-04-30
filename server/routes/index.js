const express = require('express');
const Router = express.Router();
const { Auth } = require('../middlewares/Auth');
const { readAllNews, readAllUser, createNews, createUser, loginUser, readAllUserNotif } = require('../controllers/index');


Router.get('/users', readAllUser);
Router.post('/users', createUser);
Router.post('/users/login', loginUser);

Router.get('/news', readAllNews);
Router.post('/news', createNews);

Router.get('/notification', readAllUserNotif);

module.exports = Router;