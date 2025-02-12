const express = require('express');

const likeController = require('../controllers/likeController.js');
const loginRequired = require('../middlewares/loginRequire.js');

const routes = express.Router();

routes.post('/api/user/like/:user_id/:post_id', loginRequired, likeController.like);
routes.get('/api/get/likes/:postId/:userId', loginRequired, likeController.checkLike);

module.exports = routes;
