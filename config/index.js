var path = require('path')
  , rootPath = path.normalize(__dirname + '/..')
  , env = process.env.NODE_ENV || 'development'
  , port = 8080

  
var config = {
  local: {
    env: 'local',
    root: rootPath,
    secret: 'test',
    port: port,
    dialect: 'mysql',
    db: 'bagdnd07lkbscqfmy0v5',
    db_port: 3306,
    user: 'u8nxj6jlbonuv9fi',
    pass: 'EOFkrr9Xnazx58VBQ0eP',
    host: 'bagdnd07lkbscqfmy0v5-mysql.services.clever-cloud.com'
  },
  development: {
    env: 'development',
    root: rootPath,
    secret: 'test',
    port: port,
    dialect: 'mysql',
    db: 'bagdnd07lkbscqfmy0v5',
    db_port: 3306,
    user: 'u8nxj6jlbonuv9fi',
    pass: 'EOFkrr9Xnazx58VBQ0eP',
    host: 'bagdnd07lkbscqfmy0v5-mysql.services.clever-cloud.com'
  },

  production: {
    root: rootPath,
    secret: 'test',
    port: port,
    dialect: 'mysql',
    db: 'bagdnd07lkbscqfmy0v5',
    db_port: 3306,
    user: 'u8nxj6jlbonuv9fi',
    pass: 'EOFkrr9Xnazx58VBQ0eP',
    host: 'bagdnd07lkbscqfmy0v5-mysql.services.clever-cloud.com'
  },
};

module.exports = config['development'];
