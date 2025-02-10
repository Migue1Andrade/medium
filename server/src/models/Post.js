const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');

class Post extends Model {
	static init(connection) {
		super.init({
			user_id: DataTypes.INTEGER,
			title: DataTypes.TEXT,
			text: DataTypes.STRING,
			summary: DataTypes.STRING,
			likes: DataTypes.INTEGER,
            is_deleted: DataTypes.BOOLEAN,
			post_img: DataTypes.STRING
		}, {
			sequelize: connection,
            tableName: 'post',
			createdAt: 'post_at',
			updatedAt: 'updated_at',
		});
	}

	static associate(models) {
        Post.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
		Post.hasMany(models.Comments, { foreignKey: 'post_id' });
		Post.hasMany(models.PostLikes, { foreignKey: 'post_id' });
	}

	async passwordIsValid(password) {
		return bcrypt.compare(password, this.password);
	}
}

module.exports = Post; 