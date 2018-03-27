var Sequelize = require('sequelize')
    , sequelize = new Sequelize('testdb', 'root', '', {
        dialect: "mysql",
        port: 8889,
    });

/**
 * Test Connection
 */
// sequelize
//   .authenticate()
//   .then(function(err) {
//     console.log('Connection has been established successfully.');
//   }, function (err) { 
//     console.log('Unable to connect to the database:', err);
//   });
var user_model = require('./app/models/User')(sequelize, Sequelize);
