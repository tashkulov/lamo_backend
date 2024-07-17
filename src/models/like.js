module.exports = (sequelize, DataTypes) => {
    const Like = sequelize.define('Like', {
        likerId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Users',
                key: 'id'
            }
        },
        likedId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Users',
                key: 'id'
            }
        }
    }, {});

    Like.associate = function(models) {
        Like.belongsTo(models.User, { foreignKey: 'likerId', as: 'liker' });
        Like.belongsTo(models.User, { foreignKey: 'likedId', as: 'liked' });
    };

    return Like;
};
