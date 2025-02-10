const PostService = require('../service/post.js');
const profileService = require('../service/profile.js');

module.exports = {
	async store(req, res) {
		const { user_id } = req.params;

		try {
			const post = await PostService.createPost(user_id, req.body);

			return res.status(200).json({ message: 'Post criado com sucesso', post });
		} catch (e) {
			console.log("🚀 ~ store ~ e:", e);

			return res.status(400).json({ error: e.message });
		}
	},

	async delete(req, res) { 
		const { userId, postId } = req.params;

		try {
			const response = await PostService.deletePost(userId, postId);

			return res.status(200).json(response);
		} catch (error) {
			console.error("🚀 ~ delete ~ error:", error);

			return res.status(400).json({ error: error.message });
		}
	},

	async getAll(req, res) {
		try {
			const posts = await PostService.getAllPosts();

			if (posts.length === 0) return res.status(204).json([]);

			return res.json(posts);
		} catch (error) {
			console.log("🚀 ERRO É ESSE:", error);

			return res.status(500).json({ error: error.message });
		}
	},

	async getOne(req, res) {
		const { post_id } = req.params;

		try {
			const post = await PostService.getPostById(post_id);

			return res.json(post);
		} catch (e) {
			console.log("🚀 ~ index ~ e:", e);

			return res.status(400).json({ error: e.message });
		}
	},

	async getByIdIncludesUser(req, res) {
		try {
			const { post_id } = req.params;
			const response = await PostService.getByIdIncludesUser(post_id);

			return res.json(response);
		} catch (error) {
			console.error("🚀 ~ getPostById ~ error:", error);

			return res.status(400).json({ error: 'Erro ao buscar o post' });
		}
	},

	async updatePost(req, res) {
		try {
			const { post_id } = req.params;
			const response = await PostService.updatePost(post_id, req.body);

			return res.json(response);
		} catch (error) {
			console.error("🚀 ~ updatePost ~ error:", error);

			return res.status(400).json({ error: 'Erro ao atualizar o post' });
		}
	},

	async getUserPosts(req, res) {
		try {
			const posts = await profileService.getUserPosts(req.params.user_id);

			return res.json(posts);
		} catch (error) {
			console.error("🚀 ~ getUserPosts ~ error:", error);

			return res.status(401).json({ error: 'Erro ao buscar os posts do usuário' });
		}
	}
}
