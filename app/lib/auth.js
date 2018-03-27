var jwt = require('jsonwebtoken');

module.exports = function (app, utils) {
    
    function checkCredentials(uname, pass, callback) {
    
        var model = utils.loadModel('user');
        
        model.findOne({
            where: {
                username : uname
            }
        }).then( (user) => {
            
            if (user == null) {
                callback(false, 'Authentication failed. User not found.')
            } else {
                // var hashedPassword = bcrypt.hashSync(password, user.salt)
                var hashedPassword = pass;
                user = user.dataValues;
                if (user.password === hashedPassword) {
                    callback(true, 'Login success.',user)
                }
                else callback(false, 'Authentication failed. Wrong password.')

            }
        })
    }
    
    return {
        setMiddleware: (req, res, next) => { 
            var token = req.body.token || req.query.token || req.headers['x-access-token'];
            
            if (token) {
                jwt.verify(token, 'secret', function (err, decoded) {
                    if (err) {
                        return res.json({ status: false, msg: 'Failed to authenticate token.' });
                    } else {
                        req.decoded = decoded;
                        console.log( "req.decode : " ,req.decoded);
                        next();
                    }
                });
            } else {
                return res.status(403).send({
                    status: false,
                    msg: 'No token provided'
                });
            }
        },

        login: (req,res) => {        
            checkCredentials(req.body.username, req.body.password, (status, msg, user) => {
                var data;
                if (status) {
                    var userInfo = {
                        name: req.body.username,
                        id: user.id
                    }
                    var token = jwt.sign(userInfo, 'secret', { expiresIn: 60 * 60 });
                    data = {
                        status: status,
                        name: user.name,
                        msg: msg,
                        token: token
                    };
                } else {
                    data = {
                        status: status,
                        msg: msg
                    };
                }
               res.json(data);
            })
        }
    }
};




