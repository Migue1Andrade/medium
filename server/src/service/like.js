const Like = require('../models/PostLikes');
const Post = require('../models/Post');

class LikeService {
	async onLike(post_id, user_id) {
		const post = await Post.findByPk(post_id);

		if (!post) throw new Error('Post não encontrado');

		const [like, isCreated] = await Like.findOrCreate({
			where: { user_id, post_id }
		});

		if (!isCreated) {
			like.is_deleted = !like.is_deleted;
			post.likes += like.is_deleted ? -1 : 1;
		} else {
			like.is_deleted = false;
			post.likes += 1;
		};

		await like.save();
		await post.save();

		return {
			message: isCreated ? 'Like registrado com sucesso!' : 'Like atualizado com sucesso!',
			post_id: post.id,
			likes: post.likes,
			is_deleted: like.is_deleted
		};
	};

	async checkLike(postId, userId) {
		const like = await Like.findOne({
			where: {
				post_id: postId,
				user_id: userId
			}
		});

		if (like) {
			like.is_deleted = !like.is_deleted;
			await like.save();

			return {
				isLiked: !like.is_deleted,
				message: like.is_deleted ? 'Like removido com sucesso.' : 'Like adicionado novamente.'
			};
		} else {
			await Like.create({
				post_id: postId,
				user_id: userId,
				is_deleted: false
			});

			return { isLiked: true, message: 'Like adicionado com sucesso.' };
		};
	};
};

module.exports = new LikeService();
