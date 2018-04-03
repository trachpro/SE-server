module.exports = function (sequelize, Sequelize) {
    var Comment = sequelize.define('comments', {
        ID: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        postID: Sequelize.INTEGER,
        authorID: Sequelize.INTEGER,
        content: Sequelize.TEXT,
        createdAt: Sequelize.DATE,
        editedAt: Sequelize.DATE,
        deletedAt: Sequelize.DATE,
        status: Sequelize.INTEGER
    }, {
        timestamps: false
    });
    return Comment;
}