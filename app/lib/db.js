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


module.exports = db;