const Post = require('../models/Post');

module.exports = {
	async query(req, res) {
		try {
			const { id } = req.params;

			if(!id) return res.status(400).json({ message: 'Missing id' });

			else {
				const post = await Post.findByPk(id);

				if(!post) return res.status(404).json({ message: 'Post not found' });

				return res.json(post.user_id);
			}
		} catch (error) {
			console.error(error);
			return res.status(500).json({ message: 'Internal server error' });
		}
	}
};
