const express = require('express');
const routes = express.Router();
const loginRoutes = require('./routes/loginRoutes.js');
const likeRoutes = require('./routes/likeRoutes.js');
const postRoutes = require('./routes/postRoutes.js');
const userRoutes = require('./routes/userRoutes.js');

routes.use(loginRoutes);
routes.use(likeRoutes);
routes.use(postRoutes);
routes.use(userRoutes);

module.exports = routes;
