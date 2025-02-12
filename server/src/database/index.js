const Sequelize = require('sequelize');
const dbConfig = require('../config/database');

const User = require('../models/User.js');
const Post = require('../models/Post.js');
const PostLikes = require('../models/PostLikes.js');

const models = [User, Post, PostLikes];
const connection = new Sequelize(dbConfig);

models.forEach(model => model.init(connection));
models.forEach(model => model.associate && model.associate(connection.models));
