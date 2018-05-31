module.exports = function (sequelize, Sequelize) {
    var Comment = sequelize.define('comments', {
        ID: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        postID: {
            type: Sequelize.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: {
                    args: [true],
                    msg: "Post ID is required"
                }
            }
        },
        authorID: {
            type: Sequelize.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: {
                    args: [true],
                    msg: "Commentator is required"
                }
            }
        },
        content: {
            type: Sequelize.TEXT,
            allowNull: false,
            validate: {
                notEmpty: {
                    args: [true],
                    msg: "Comment content is required"
                }
            }
        },
        createdAt: Sequelize.DATE,
        editedAt: Sequelize.DATE,
        deletedAt: Sequelize.DATE,
        status: Sequelize.INTEGER
    }, {
        timestamps: false
    });
    return Comment;
}