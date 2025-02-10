const Post = require('../models/Post');
const User = require('../models/User');

class PostService {
    async getUserPosts(user_id) {
        try {
            const posts = await Post.findAll({
                where: { user_id },
                include: {
                    model: User,
                    as: 'user',
                    attributes: ['name', 'email', 'profile_img'],
                }
            });

            return posts;
        } catch (error) {
            throw new Error('Erro ao buscar os posts do usuário');
        }
    }
}

module.exports = new PostService();
