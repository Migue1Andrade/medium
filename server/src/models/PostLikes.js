const { Model, DataTypes } = require('sequelize');

class PostLikes extends Model {
    static init(connection) {
        super.init({
            user_id: DataTypes.INTEGER,
            post_id: DataTypes.INTEGER,
            is_deleted: DataTypes.BOOLEAN
        }, {
            sequelize: connection,
            tableName: 'post_likes',
            createdAt: 'liked_at',
            updatedAt: 'update_at'
        });
    }

    static associate(models) {
        PostLikes.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
        PostLikes.belongsTo(models.Post, { foreignKey: 'post_id', as: 'post' });
    }
}

module.exports = PostLikes;
