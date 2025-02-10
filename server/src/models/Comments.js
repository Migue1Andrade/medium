const { Model, DataTypes } = require('sequelize');

class Comments extends Model {
    static init(connection) {
        super.init({
            user_id: DataTypes.INTEGER,
            post_id: DataTypes.INTEGER,
            comment: DataTypes.STRING
        },{
            sequelize: connection,
            tableName: 'comments',
        });
    }

    static associate(models) {
        Comments.belongsTo(models.User, { foreignKey: 'user_id' });
        Comments.belongsTo(models.Post, { foreignKey: 'post_id' });
    }
}

module.exports = Comments;