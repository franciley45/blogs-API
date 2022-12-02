module.exports = (sequelize, DataTypes) => {
    const BlogPost = sequelize.define('BlogPost', {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        title: {
            allowNull: false,
            type: DataTypes.STRING,
        },
        content: {
            allowNull: false,
            type: DataTypes.STRING,
        },
        userId: { type: DataTypes.INTEGER, foreignKey: true },
        published: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        },
        updated: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        },
        sequelize,
        timestamps: false,
        underscored: true,
        tableName: 'blog_posts',
    })
    BlogPost.associate = (models) => {
        BlogPost.belongsTo(models.User, { foreignKey: 'userId', as: 'users' });
    };
    return BlogPost;
}