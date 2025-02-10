const Like = require('../models/PostLikes');
const Post = require('../models/Post');

class LikeService {
    async toggleLike(post_id, user_id) {
        try {
            const post = await Post.findByPk(post_id);
            if (!post) throw new Error('Post não encontrado');

            const [existingLike, created] = await Like.findOrCreate({
                where: { user_id, post_id },
            });

            if (!created) {
                existingLike.is_deleted = !existingLike.is_deleted;
                post.likes += existingLike.is_deleted ? -1 : 1;
            } else {
                existingLike.is_deleted = false;
                post.likes += 1;
            }

            await existingLike.save();
            await post.save();

            return {
                message: created ? 'Like registrado com sucesso!' : 'Like atualizado com sucesso!',
                post_id: post.id,
                likes: post.likes,
                is_deleted: existingLike.is_deleted,    
            };
        } catch (error) {
            throw new Error('Erro ao registrar like');
        }
    }

    async checkLike(postId, userId) {
        try {
            const existingLike = await Like.findOne({
                where: {
                    post_id: postId,
                    user_id: userId,
                }
            });

            if (existingLike) {
                existingLike.is_deleted = !existingLike.is_deleted;
                await existingLike.save();

                return {
                    isLiked: !existingLike.is_deleted,
                    message: existingLike.is_deleted ? 'Like removido com sucesso.' : 'Like adicionado novamente.'
                };
            } else {
                await Like.create({
                    post_id: postId,
                    user_id: userId,
                    is_deleted: false,
                });

                return { isLiked: true, message: 'Like adicionado com sucesso.' };
            }
        } catch (error) {
            throw new Error('Erro ao processar o like.');
        }
    }
}

module.exports = new LikeService();
