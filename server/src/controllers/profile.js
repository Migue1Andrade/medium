const profileService = require('../service/profile.js');

module.exports = {
	async getUserPosts(req, res) {
		try {
			const posts = await profileService.getUserPosts(req.params.user_id);

			return res.json(posts);
		} catch (error) {
			console.error("🚀 ~ getUserPosts ~ error:", error);

			return res.status(401).json({ error: 'Erro ao buscar os posts do usuário' });
		}
	}
};
