var express = require('express')
    , os = require('os')
    , compression = require('compression')
    , morgan = require('morgan')
    , methodOverride = require('method-override')
    , session = require('express-session')
    , bodyParser = require('body-parser')
    , cookieParser = require('cookie-parser')
    , favicon = require('serve-favicon')
    , interfaces = os.networkInterfaces()
    , addrs = []
    , cloudinary = require('cloudinary')

// Set config.host ip
for (k in interfaces) {
    for (k2 in interfaces[k]) {
        var address = interfaces[k][k2]
        if (address.family == 'IPv4' && !address.internal)
            addrs.push(address.address)
    }
}

module.exports = function (app, config) {

    config.host = addrs.pop()

    // Set app vars
    app.set('port', config.port);
    app.set('views', config.root + '/app/views');
    app.set('view engine', 'html');
    app.engine('html', require('ejs').renderFile);

    // Configure API environment  
    app.use(compression())
    app.use(morgan('dev'))
    // 
    app.use(bodyParser.json({limit: '50mb'}))
    app.use(bodyParser.urlencoded({limit: '50mb' , extended: true }))
    app.use(cookieParser())
    app.use(methodOverride())
    // app.use(express.static(config.root + '/media'))
    app.use(express.static(config.root + '/public'))
    app.use(favicon(config.root + '/public/img/favicon.ico'))
    app.use(session({ resave: true,
                  saveUninitialized: true,
                  secret: '7]fo+>+yR-&}}|!Kh>kC6Vbl:Krb)TrG&Ibkcu~AcRV/t[$+H+:_xb#a4G20MK>a' }))
    
    // CORS support
    app.all('*', function (req, res, next) {
        if (!req.get('Origin')) return next();
        // use "*" here to accept any origin
        res.set('Access-Control-Allow-Origin', '*');
        res.set('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
        res.set('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type');
        res.set('Access-Control-Allow-Credentials', 'true');
        // res.set('Access-Control-Allow-Max-Age', 3600);
        if ('OPTIONS' == req.method) return res.send(200);
        next();
    })
   
}