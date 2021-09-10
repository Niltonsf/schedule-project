const express = require('express');
const route = express.Router();

const homeController = require('./src/controllers/homeController');
const loginController = require('./src/controllers/loginController');
const registerController = require('./src/controllers/registerController');
const contactController = require('./src/controllers/contactController');

const { loginRequired } = require('./src/middleware/middleware');

// Home route
route.get('/', homeController.index);

// Login routes
route.get('/login/index', loginController.index);
route.post('/login/login', loginController.login);
// Logout route
route.get('/login/logout', loginController.logout);

// Register routes
route.get('/register/index', registerController.index);
route.post('/register/register', registerController.register);

// Contact routes
route.get('/contact/index', loginRequired, contactController.index);
route.post('/contact/register', loginRequired, contactController.register)
route.get('/contact/index/:id', loginRequired, contactController.editIndex);
route.post('/contact/edit/:id', loginRequired, contactController.edit);
route.get('/contact/delete/:id', loginRequired, contactController.delete);

module.exports = route;