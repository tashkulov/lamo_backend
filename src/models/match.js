module.exports = (sequelize, DataTypes) => {
    const Match = sequelize.define('Match', {
        userId1: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Users',
                key: 'id'
            }
        },
        userId2: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Users',
                key: 'id'
            }
        }
    }, {});

    Match.associate = function(models) {
        Match.belongsTo(models.User, { foreignKey: 'userId1', as: 'user1' });
        Match.belongsTo(models.User, { foreignKey: 'userId2', as: 'user2' });
    };

    return Match;
};
