module.exports = function(sequelize, Sequelize) {
    var Post = sequelize.define('posts', {
    ID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    authorID: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: {
                args: [true],
                msg: "Author is required"
            }
        }
    },
    title: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                args: [true],
                msg: "Title is required"
            }
        }
    },
    subtitle: {
        type: Sequelize.TEXT,
    },
    content: {
        type: Sequelize.TEXT,
        allowNull: false,
        validate: {
            notEmpty: {
                args: [true],
                msg: "Content is required"
            }
        }
    },
    createdAt: Sequelize.DATE,
    editedAt: Sequelize.DATE,
    deletedAt: Sequelize.DATE,
    categoryID: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: {
                args: [true],
                msg: "Category is required"
            }
        }
    },
    status: Sequelize.INTEGER
    }, {
    timestamps: false
    });
    return Post;
}
