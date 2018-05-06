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
                    }
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
            models.user.create({
                username: req.body.username,
                name: req.body.name,
                password: req.body.password,
                email: req.body.email,
                status: 1,
                profilePicture: 'https://res.cloudinary.com/huypq/image/upload/v1523162344/avatar.png'
            }).then((data) => {
                res.json({
                    status: true, 
                    message: "1 row(s) inserted", 
                    data: data.dataValues });
            }).catch((err) => {
                var msg = (err.errors[0].message) ? err.errors[0].message : "Cannot perform action" 
                
                res.json({
                    status: false, 
                    message: msg
                });
            });
        },
        update: (req, res) => {
            var value = {};
            
            if(req.body.newPassword) value.password = req.body.newPassword;
            if(req.body.name) value.name = req.body.name;
            if(req.body.email) value.email = req.body.email;
            if(req.body.profilePicture) value.profilePicture = req.body.profilePicture;

            var condition = { 
                ID: req.decoded.ID
            }
            if (req.body.newPassword) condition.password = req.body.password
            
            models.user.update(value, { where: condition })
                .then((row) => {
                    if (row > 0) {
                        res.json({
                            status: true,
                            message: "User information updated" });
                    } else {
                        res.json({
                            status: false, 
                            message: "Update failed" });
                    }
                }).catch((err) => {
                    res.json({ 
                        status: false, 
                        msg: "Cannot perform action" 
                    });
                });
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