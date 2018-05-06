var jwt = require('jsonwebtoken'),
    cloudinary = require('cloudinary'),
    nodemailer = require('nodemailer'),
    randomstring = require('randomstring');

module.exports = function (app, utils) {
    
    const checkCredentials = (uname, pass, callback) => {
    
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

    // Verify a valid registered email of the user
    const verifyEmail = (email, callback) => {
        var model = utils.loadModel('user');

        model.findOne({
            where: {
                email: email,
                status: 1
            }
        }).then( user => {
            if(!user) {
                var data = {
                    status: false,
                    message: "Cannot find your email in our database"
                }
                return callback(data);
            } else {
                var data = {
                    status: true,
                    message: "Found a user"
                }
                return callback(data)
            }
        }).catch(err => {
            var data = {
                status: false,
                message: "Cannot perform action"
            };
            return callback(data);
        })
    }

    // Send mail to user informing new password has ben set
    const sendMail = (mailOptions, callback) => {
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                type: 'OAuth2',
                user: 'p.quanghuy21@gmail.com',
                clientId: '405845717220-cc069i8gd9sk1c0d6npaeeq7kuvbdr59.apps.googleusercontent.com',
                clientSecret: 'WjQudGt2dJEHubERrCAxqQWM',
                refreshToken: '1/QAJVNcDk8rKYSYiEv1wmwtO00nuuoq45sPALOAx8H0J1Mbv61NV8RMRvZEs3TJrg'
            }
        })

        transporter.sendMail(mailOptions)
            .then( data => {
                var result = {
                    status: true,
                    message: "The new password has been sent to your email"
                }
                callback(result);
            })
            .catch( err => {
                console.log(err)
                var result = {
                    status: true,
                    message: "Cannot send new password to your email.Please contact us for support"
                }
                callback(result)
            })
    }

    // Set new password to the user with registered email
    const resetPassword = (email, callback) => {
        
        var newPassword = randomstring.generate(7);
        var model = utils.loadModel('user');

        var value = {
            password: newPassword
        }
        var condition = {
            email: email
        }
        model.update(value, { where: condition })
            .then( row => {
                var data;
                if (row > 0) {
                    data = {
                        status: true,
                        message: "User information updated",
                        newPassword: newPassword
                    };
                } else {
                    data = {
                        status: false, 
                        message: "Update failed" 
                    }
                }
                callback(data);
            }).catch( err => {
                console.log(err);
                var data = { 
                    status: false, 
                    msg: "Cannot perform action" 
                }
                callback(data);
            });
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
                    
                    var timeExpire;
                    
                    if(req.body.isRemember) timeExpire = 60 * 60 * 24 * 30 * 3 // 3 months
                    else timeExpire = 60 * 60 * 2 // 2 hours 
                    
                    var token = jwt.sign(userInfo, 'secret', { expiresIn: timeExpire });
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

        // create a new token for the user whose token is exprired
        refreshToken: (req, res) => {
            var userInfo = {
                name: req.decoded.name,
                ID: req.decoded.ID
            }

            var newToken = jwt.sign(userInfo, 'secret', { expiresIn: 60 * 60 * 2 });
            
            res.json({
                success: true,
                token: newToken
            })

        },

        resetPassword: (req,res) => {
            var email = req.body.email;
            
            verifyEmail(email, (data) => {
                // return res if no user is found
                if(!data.status) return res.json(data);

                // set new password
                resetPassword(email, (dataReturn) => {
                    if(!dataReturn.status) return res.json(dataReturn);

                    let mailOptions = {
                        from: 'Blog App <noreply@blogapp.com>',
                        to: email,
                        subject: 'Recover your password',
                        html: "<p>Your password has been set to <b>" + dataReturn.newPassword + "</b>.</p>" + 
                                "<p>Now you can login with new password and remember to change the password as you wish.</p>" +
                                "<p>Regards</p>" 
                    };
                    sendMail(mailOptions, (result) => {
                        return res.json(result);
                    })

                })
            })
        }
    }
};