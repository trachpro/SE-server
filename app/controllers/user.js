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
            const id = req.params.id;
            models.user.findById(id).then((data) => {
                res.json({ "status": "200", "message": "successful", "data": data.dataValues });
            });
        },
        insert: (req, res) => {
            models.user.create({
                username: req.body.username,
                name: req.body.name,
                password: req.body.password,
                email: req.body.email,
                status: 1,
            }).then((data) => {
                res.json({sucess: true, "status": "200", "message": "1 row(s) inserted", "data": data.dataValues });
            }).catch((err) => {
                res.json({success: false, "status": "404", "msg": err.errors[0].message});
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
                        res.json({success: true, "status": "200", message: "Password Changed" });
                    } else {
                        res.json({success: false, "status": "200", message: "Wrong password" });
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
                        res.json({ "status": "200", "message": rows + " row(s) affected" });
                    else
                        res.json({ "status": "300", "message": rows + " row(s) affected" });
                });
        }
    }
}