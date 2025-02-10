const express = require('express');

const postController = require('./controllers/postController.js');
const userController = require('./controllers/userController.js');
const loginRequired = require('./middlewares/loginRequire.js');
const login = require('./controllers/loginController.js');
const likeController = require('./controllers/likeController.js');

const routes = express.Router();

routes.post('/api/login', login.store);

routes.post('/api/post/create/:user_id', loginRequired, postController.store);
routes.post('/api/user/create', userController.createUser);
routes.post('/api/user/like/:user_id/:post_id', loginRequired, likeController.like);

routes.get('/api/send/post/:post_id', loginRequired ,postController.getOne);
routes.get('/api/send/post/include/user/:post_id', loginRequired, postController.getByIdIncludesUser);

routes.put('/api/update/post/:post_id', loginRequired, postController.updatePost);
routes.put('/api/update/user/:user_id', loginRequired, userController.updateUser);

routes.get('/api/user', loginRequired, userController.index);
routes.get('/api/post', postController.getAll);
routes.get('/api/post/:user_id', loginRequired, postController.getUserPosts);
routes.get('/api/user/:user_id', loginRequired,userController.getUserById);
routes.get('/api/get/likes/:postId/:userId', loginRequired, likeController.checkLike);

routes.delete('/api/remove/post/:userId/:postId', loginRequired, postController.delete);

module.exports = routes;
