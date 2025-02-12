const Post = require('../models/Post');
const User = require('../models/User');

class PostService {
	async getUserPosts(user_id) {
		const posts = await Post.findAll({
			where: { user_id },
			include: {
				model: User,
				as: 'user',
				attributes: ['name', 'email', 'profile_img']
			}
		});

		return posts;
	};
};

module.exports = new PostService();
