module.exports = function(sequelize, Sequelize) {
    var Post = sequelize.define('posts', {
    ID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    authorID: Sequelize.INTEGER,
    title: Sequelize.STRING,
    content: Sequelize.TEXT,
    createdAt: Sequelize.DATE,
    editedAt: Sequelize.DATE,
    deletedAt: Sequelize.DATE,
    categoryID: Sequelize.STRING,
    status: Sequelize.INTEGER
    }, {
    timestamps: false
    });
    return Post;
}
