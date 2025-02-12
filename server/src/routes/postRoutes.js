const express = require('express');

const postController = require('../controllers/postController.js');
const loginRequired = require('../middlewares/loginRequire.js');

const routes = express.Router();

routes.post('/api/post/create/:user_id', loginRequired, postController.store);
routes.get('/api/send/post/include/user/:post_id', loginRequired, postController.getByIdIncludesUser);
routes.get('/api/send/post/:post_id', loginRequired ,postController.getOne);
routes.put('/api/update/post/:post_id', loginRequired, postController.updatePost);
routes.get('/api/post', postController.getAll);
routes.get('/api/post/:user_id', loginRequired, postController.getUserPosts);
routes.delete('/api/remove/post/:userId/:postId', loginRequired, postController.delete);

module.exports = routes;
