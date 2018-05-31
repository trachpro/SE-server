var config = require('./config')
    , express = require('express')
    , db = require('./app/lib/db')
    , utils = require('./app/lib/utils')(config, db)
    , app = express()
   
function init() {
    db.checkConnection(successHandle, errorHandle);
}

function startServer() {
    console.log('Connection has been established successfully.');
    var model_list = utils.loadModels();
    var http = require('http').createServer(app)
        require('./config/express')(app, config)
        require('./config/routes')(app, utils, model_list)
        http.listen(config.port, function () {
            console.log("API running at http://" + config.hostname)
        })
}

function successHandle(err) {
    startServer();
}

function errorHandle(err) {
    console.log('Unable to connect to the database:', err);
}

init();

module.exports = app;