const Post = require('../models/Post');
const User = require('../models/User');

class PostService {
	async createPost(user_id, postData) {
		try {
			const { title, text, summary, post_img } = postData;
			
			const post = await Post.create({ 
				user_id, 
				title, 
				text, 
				summary, 
				post_img: post_img || 'https://placehold.co/600x400'
			});

			return post;
		} catch (error) {
			throw new Error('Erro ao criar o post');
		}
	}

	async getPostById(post_id) {
		try {
			const post = await Post.findOne({
				where: {
					id: post_id, 
					is_deleted: false
				}
			});

			if (!post) {
				throw new Error('Post não encontrado');
			}

			return post;
		} catch (error) {
			throw new Error('Erro ao buscar o post');
		}
	}

	async deletePost(userId, postId) {
		try {
			const [rowsUpdated] = await Post.update({ 
				is_deleted: true 
			}, 
			{ 
				where: {
					id: postId,
					user_id: userId,
					is_deleted: false 
				},
				returning: true
			});
			
			if (rowsUpdated === 0) {
				throw new Error('Post não encontrado ou já foi deletado');
			}

			return { message: 'Post deletado com sucesso' };
		} catch (error) {
			throw new Error('Erro ao deletar o post');
		}
	}

	async getAllPosts() {
		try {
			const data = await Post.findAll({
				where: { is_deleted: false },
				include: {
					model: User,
					as: 'user',
					attributes: ['name', 'profile_img'],
				}
			});

			console.log("🚀 ~ PostService ~ getAllPosts ~ data:", data)
			return data;
		} catch (error) {
			throw new Error('Erro ao buscar dados do post');
		}
	}

    async updatePost(post_id, postData) {
        try {
            const { title, text, summary, postImg } = postData;

            const post = await Post.findByPk(post_id);
            if (!post) {
                throw new Error('Post não encontrado');
            }

            await post.update({ title, text, summary, postImg });

            return post;
        } catch (error) {
            throw new Error('Erro ao atualizar o post');
        }
    }
    async getByIdIncludesUser(post_id) {
        try {
            const post = await Post.findOne({
                where: { id: post_id, is_deleted: false },
                include: [
                    {
                        model: User,
                        as: 'user',
                        attributes: ['name', 'profile_img']
                    }
                ]
            });

            if (!post) {
                throw new Error('Post não encontrado');
            }

            return post;
        } catch (error) {
            throw new Error('Erro ao buscar o post');
        }
    }
}

module.exports = new PostService();
