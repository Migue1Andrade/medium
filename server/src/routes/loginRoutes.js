const express = require('express');

const loginController = require('../controllers/loginController.js');

const routes = express.Router();

routes.post('/api/login', loginController.store);

module.exports = routes;
