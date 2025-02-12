const express = require('express');

const userController = require('../controllers/userController.js');
const loginRequired = require('../middlewares/loginRequire.js');
const validate = require('../validation/validate.js');
const CreateUser = require('../validation/CreateUser.js');

const routes = express.Router();

routes.put('/api/update/user/:user_id', loginRequired, userController.updateUser);
routes.get('/api/user', loginRequired, userController.index);
routes.get('/api/user/:user_id', loginRequired,userController.getUserById);
routes.post('/api/user/create', validate(CreateUser),userController.createUser);

module.exports = routes;
