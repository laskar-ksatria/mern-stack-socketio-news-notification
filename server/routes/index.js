const express = require('express');
const Router = express.Router();
const { Auth } = require('../middlewares/Auth');
const { readAllNews, readAllUser, createNews, createUser, loginUser, readAllUserNotif, readMyNews, updateRead, readMyAccount } = require('../controllers/index');


Router.get('/users', readAllUser);
Router.post('/users', createUser);
Router.post('/users/login', loginUser);
Router.get('/users/myAccount', Auth, readMyAccount);

Router.get('/news', readAllNews);
Router.post('/news', createNews);
Router.get('/myNews', Auth,readMyNews);

Router.get('/notification', readAllUserNotif);
Router.patch('/myNews/:notifId', updateRead);

module.exports = Router;