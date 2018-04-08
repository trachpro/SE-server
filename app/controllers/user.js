module.exports = function (models) {
    return {
        list: (req, res) => {
            var page = req.params.page ? parseInt(req.params.page) : 1;
            var limit = req.params.limit ? parseInt(req.params.limit) : 10;
            if (page < 1) page = 1;
            if (limit < 1 || limit > 20) limit = 10;
            models.user.findAll({ offset: (page - 1) * limit, limit: limit }).then((datas) => {
                res.json(datas || [])
            });
        },
        search: (req, res) => {
            var page = req.body.page ? parseInt(req.body.page) : 1;
            var limit = req.body.limit ? parseInt(req.body.limit) : 10;
            if (page < 1) page = 1;
            if (limit < 1 || limit > 20) limit = 10;

            var cond = {}
            if (req.body.name) cond.name = req.body.name;
            if (req.body.age) cond.age = parseInt(req.body.age);
            if (req.body.email) cond.email = req.body.email;

            models.user.findAll({ offset: (page - 1) * limit, limit: limit, where: cond }).then((datas) => {
                res.json(datas || [])
            });
        },
        get: (req, res) => {
            const ID = req.decoded.ID;
            models.user.findOne({
                attributes: ['ID','username', 'name', 'email', 'profilePicture','createdAt'],
                where: {ID: req.decoded.ID, status: 1},
                include: [{
                    model: models.post,
                    as: "posts",
                    attributes: ['ID', 'title', 'createdAt','categoryID']
                }]
            }).then((data) => {
                res.json({ 
                    status: true, 
                    message: "successful", 
                    data: data.dataValues 
                });
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
            var value = {
                password : req.body.newPassword
            };
            models.user.update(value, { where: { 
                    id: req.decoded.id,
                    password: req.body.oldPassword 
                } })
                .then((row) => {
                    if (row > 0) {
                        res.json({
                            status: true,
                            message: "Password Changed" });
                    } else {
                        res.json({
                            success: false, 
                            message: "Wrong password" });
                    }
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
                });
        }
    }
}