module.exports = (sequelize, DataTypes) => {
    const UserProfile = sequelize.define('UserProfile', {
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Users',
                key: 'id'
            }
        },
        age: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        gender: {
            type: DataTypes.STRING,
            allowNull: false
        },
        interests: {
            type: DataTypes.STRING,
            allowNull: true
        },
        location: {
            type: DataTypes.STRING,
            allowNull: true
        },
        bio: {
            type: DataTypes.TEXT,
            allowNull: true
        }
    }, {});

    UserProfile.associate = function(models) {
        UserProfile.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
    };

    return UserProfile;
};
