var config = require('../../config')
    , Sequelize = require('sequelize')
    , sequelize = new Sequelize(config.db, config.user, config.pass, {
        dialect: config.dialect,
        port: config.db_port,
    });
var db = {};
db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.checkConnection = function(successHandle, errorHandle) {
    sequelize
        .authenticate()
        .then(successHandle, errorHandle);
}

//Models/tables
db.user = require('../models/user.js')(sequelize, Sequelize);  
db.category = require('../models/category.js')(sequelize, Sequelize);  
db.post = require('../models/post.js')(sequelize, Sequelize);

//Relations  
db.post.belongsTo(db.user, {
    foreignKey: 'author_id',
    // targetKey: 'id'
});
db.user.hasMany(db.post, {
    foreignKey: 'author_id',
    // targetKey: 'id'
});

module.exports = db;