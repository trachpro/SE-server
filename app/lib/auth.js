var jwt = require('jsonwebtoken');
var cloudinary = require('cloudinary');

module.exports = function (app, utils) {
    
    function checkCredentials(uname, pass, callback) {
    
        var model = utils.loadModel('user');
        
        model.findOne({
            where: {
                username : uname,
                status: 1
            }
        }).then( (user) => {
            
            if (user == null) {
                callback(false, 'Username not found.')
            } else {
                // var hashedPassword = bcrypt.hashSync(password, user.salt)
                var hashedPassword = pass;
                user = user.dataValues;
                if (user.password === hashedPassword) {
                    callback(true, 'Login success.',user)
                }
                else callback(false, 'Incorrect password.')

            }
        })
    }
    
    return {
        setMiddleware: (req, res, next) => { 
            var token = req.body.token || req.query.token || req.headers['x-access-token'];
            
            if (token) {
                jwt.verify(token, 'secret', function (err, decoded) {
                    if (err) {
                        return res.json({ status: false, message: 'Failed to authenticate token.' });
                    } else {
                        req.decoded = decoded;
                        next();
                    }
                });
            } else {
                return res.status(403).send({
                    status: false,
                    message: 'No token provided'
                });
            }
        },

        login: (req,res) => {        
            checkCredentials(req.body.username, req.body.password, (status, msg, user) => {
                var data;
                if (status) {
                    var userInfo = {
                        name: req.body.username,
                        ID: user.ID
                    }
                    var token = jwt.sign(userInfo, 'secret', { expiresIn: 60 * 60 });
                    data = {
                        status: status,
                        ID: user.ID,
                        name: user.name,
                        profilePicture: user.profilePicture,
                        message: msg,
                        token: token
                    };
                } else {
                    data = {
                        status: status,
                        message: msg
                    };
                }
               res.json(data);
            })
        },

        uploadImage: (req, res) => {
            cloudinary.config({
                cloud_name: 'huypq',
                api_key: '245882635292544',
                api_secret: '2bDLyzXmzM7wtIlnoMS6Zd1ip_I',
            });
          
            cloudinary.v2.uploader.upload(req.body.imageURI,  {
                folder: 'blog'
            }, function (err, result) {
                if(result) {
                    res.json({
                        success: true,
                        message: "Image uploaded",
                        imageUrl: result.secure_url
                    })
                } else {
                    res.json({
                        success: false,
                        message:"Failed to upload image"
                    })
                }   
            })
        }, 

        refreshToken: (req, res) => {
            var userInfo = {
                name: req.decoded.name,
                ID: req.decoded.ID
            }

            var newToken = jwt.sign(userInfo, 'secret', { expiresIn: 60 * 60 });
            
            res.json({
                success: true,
                token: newToken
            })

        }
    }
};




