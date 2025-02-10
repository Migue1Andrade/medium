const LikeService = require('../service/like.js');

module.exports = {
	async checkLike(req, res) {
		try {
			const { postId, userId } = req.params;
			const response = await LikeService.checkLike(postId, userId);

			return res.json(response);
		} catch (error) {
			console.error("🚀 ~ checkLike ~ error:", error);

			return res.status(500).json({ error: 'Erro ao processar o like.' });
		}
	},
	
	async like(req, res) {
		try {
			const { post_id, user_id } = req.params;
			const response = await LikeService.toggleLike(post_id, user_id);

			return res.status(200).json(response);
		} catch (error) {
			console.error("🚀 ~ likePost ~ error:", error);

			return res.status(500).json({ error: 'Erro ao registrar like' });
		}
	}
};
