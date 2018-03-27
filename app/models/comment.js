module.exports = function (sequelize, Sequelize) {
    var Comment = sequelize.define('comments', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        post_id: Sequelize.INTEGER,
        author_id: Sequelize.INTEGER,
        content: Sequelize.TEXT,
        time: Sequelize.DATE
    }, {
        timestamps: false
    });
    return Comment;
}