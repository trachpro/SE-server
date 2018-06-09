var bcrypt = require('bcrypt');

module.exports = function (models) {
    return {
        list: (req, res) => {
            
        },
        search: (req, res) => {
            
        },
        get: (req, res) => {
            const id = req.params.id || req.query.id;

            models.user.findOne({
                attributes: ['ID','username', 'name', 'email', 'profilePicture','createdAt'],
                where: {ID: id, status: 1},
                include: [{
                    model: models.post,
                    as: "posts",
                    attributes: ['ID', 'title', 'createdAt','categoryID'],
                    where: {
                        status: 1,
                    },
                    required: false,
                }]
            }).then( data => {
                if(data) {
                    res.json({ 
                        status: true, 
                        message: "successful", 
                        data: data.dataValues 
                    });
                } else {
                    res.json({
                        status: false,
                        message: "Cannot find user"
                    })
                }
            }).catch( err => {
                res.json({
                    status: false,
                    message: "Cannot perform action"
                })
            });
        },
        insert: (req, res) => {
            let userinfo = {
                username: req.body.username,
                name: req.body.name,
                email: req.body.email,
                status: 1,
                profilePicture: 'https://res.cloudinary.com/huypq/image/upload/v1523162344/avatar.png'
            }
            if (!req.body.password) {
                return res.json({
                    status: false,
                    message: "Password is required"
                })
            }
            // hash password
            let salt = bcrypt.genSaltSync(10);
            let hashPwd = bcrypt.hashSync(req.body.password, salt);

            userinfo.password = hashPwd;

            models.user.create(userinfo).then((data) => {
                res.json({
                    status: true, 
                    message: "New user created"
                });
            }).catch((err) => {
                var msg = (err.errors) ? err.errors[0].message : "Cannot perform action" 
                
                res.json({
                    status: false, 
                    message: msg
                });
            });
        },
        update: (req, res) => {

            let updateFunc = (value, condition, callback) => {
                models.user.update(value, { where: condition })
                .then((row) => {
                    if (row > 0) {
                        callback({status: true, message: "User information updated"})
                    } else {
                        console.log(row)
                        callback({status: false, message: "Update failed"})
                    }
                }).catch((err) => {
                    var msg = (err.errors) ? err.errors[0].message : "Cannot perform action"
                    callback({status: false, message: msg})
                })
            }

            /*
            *   verify old password and hash new password if user change password
            */

            let verifyPassword = (req, callback) => {
                if ( req.body.newPassword ) {
                    models.user.findOne({
                        where: req.decoded.ID
                    }).then( data => {
                        let user = data.dataValues;
                        if ( !bcrypt.compareSync(req.body.password, user.password) ) {
                            callback({
                                status: false,
                                message: "Wrong password"
                            })
                        } else {
                            let salt = bcrypt.genSaltSync(10);
                            let hashPwd = bcrypt.hashSync(req.body.newPassword, salt);
                            value.password = hashPwd;
                            callback({
                                status: true,
                                message: "New password hashed"
                            })
                        }
                        
                    }).catch(err => {
                        var msg = (err.errors) ? err.errors[0].message : "Cannot perform action"
                        callback({status: false, message: msg})
                        
                    }) 
                } else {
                    // user does not change password
                    callback({
                        status: true
                    })
                }
            }

            let value = {};
            if(req.body.name) value.name = req.body.name;
            if(req.body.email) value.email = req.body.email;
            if(req.body.profilePicture) value.profilePicture = req.body.profilePicture;

            let condition = { 
                ID: req.decoded.ID
            }

            verifyPassword(req, (data) => {
                if(!data.status) return res.json(data)

                updateFunc(value, condition, (dataReturn) => {
                    return res.json(dataReturn);
                })
            })
            
        },
        delete: (req, res) => {
            var value = {
                status: 0,
                deleteAt: Date.now()
            }
            models.user.update({
                value,
                where: {  
                    ID: req.params.id,
                    password: req.body.password  
                }
            })
                .then(rows => {
                    if (rows > 0)
                        res.json({ 
                            status: true, 
                            "message": rows + " row(s) affected" 
                        });
                    else
                        res.json({ 
                            status: false, 
                            message: "Cannot perform action" 
                        });
                }).catch((err) => {
                    res.json({ 
                        status: false, 
                        msg: "Cannot perform action" 
                    });
                });
        }
    }
}