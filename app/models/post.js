module.exports = function(sequelize, Sequelize) {
    var Post = sequelize.define('posts', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    author_id: Sequelize.INTEGER,
    title: Sequelize.STRING,
    content: Sequelize.TEXT,
    time: Sequelize.STRING,
    category: Sequelize.STRING,
    status: Sequelize.INTEGER
    }, {
    timestamps: false
    });
    return Post;
}
