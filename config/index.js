var path = require('path')
  , rootPath = path.normalize(__dirname + '/..')
  , env = process.env.NODE_ENV || 'development'
  , port = 8000
  
var config = {
  development: {
    root: rootPath,
    secret: 'test',
    app: {
      name: 'rest-api-template'
    },
    port: port,
    dialect: 'mysql',
    db: 'testdb',
    db_port: 3306,
    user: 'root',
    pass: ''
  },

  production: {
    root: rootPath,
    secret: 'test',
    app: {
      name: 'rest-api-template'
    },
    port: port,
    dialect: 'mysql',
    db: 'testdb',
    db_port: 8889,
    user: 'root',
    pass: 'root'
  }
};

module.exports = config[env];