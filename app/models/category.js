module.exports = function (sequelize, Sequelize) {
    var Category = sequelize.define('categories', {
        ID: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        category: Sequelize.STRING
    }, {
        timestamps: false
    });
    return Category;
}