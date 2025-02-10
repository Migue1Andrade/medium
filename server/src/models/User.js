const bcrypt = require('bcrypt');
const { Model, DataTypes } = require('sequelize');

class User extends Model {
    static init(connection) {
        super.init({
            name: DataTypes.STRING,
            password: DataTypes.STRING,
            email: DataTypes.STRING,
            profile_img: DataTypes.STRING,
        }, {
            sequelize: connection,
            tableName: 'users',
            createdAt: 'created_at',
            updatedAt: 'updated_at',
        });
    }

    static associate(models) {
        User.hasMany(models.Post, { foreignKey: 'user_id' });
        User.hasMany(models.PostLikes, { foreignKey: 'user_id' });
        User.hasMany(models.Comments, { foreignKey: 'user_id' });
    }

    async passwordIsValid(password) {
        return bcrypt.compare(password, this.password);
    }
}

module.exports = User;