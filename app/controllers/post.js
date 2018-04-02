module.exports = function (models) {
    return {
        list: (req, res) => {
            var page = req.params.page ? parseInt(req.params.page) : 1;
            var limit = req.params.limit ? parseInt(req.params.limit) : 10;
            if (page < 1) page = 1;
            if (limit < 1 || limit > 20) limit = 10;
            models.post.findAll({ offset: (page - 1) * limit, limit: limit }).then((datas) => {
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

            models.post.findAll({ offset: (page - 1) * limit, limit: limit, where: cond }).then((datas) => {
                res.json(datas || [])
            });
        },
        get: (req, res) => {
            const id = req.params.id;
            models.post.findOne({
                where: {id: req.params.id},
                //add author's atributes
                include: [{
                    model: models.user,
                    as: 'author',
                    attributes: ['name'],
                },{
                    // commentator's attributes
                    model: models.comment,
                    include: [{
                        model: models.user,
                        as: 'commentator',
                        attributes: ['name']
                    }]
                }, {
                    model: models.category,
                }]
            }).then( (data) => {
                res.json({ 
                    success: true, 
                    message: "successful", 
                    data: data.dataValues });
            })
        },
        insert: (req, res) => {
            models.post.create({
                authorID: req.decoded.id,
                title: req.body.title,
                content: req.body.content,
                categoryID: req.body.categoryID,
                status: 1,
            }).then((data) => {
                res.json({ 
                    success: true, 
                    message: "successful", 
                    data: data.dataValues 
                });
            }).catch((err) => {
                res.json({ 
                    success: false, 
                    message: err.errors[0].message
                });
            });
        },
        update: (req, res) => {
            var value = {
                title: req.body.title,
                content: req.body.content,
                categoryID: req.body.categoryID,
                editedAt: Date.now(),
                status: 1,
            };
            models.post.update(value, { where: { ID: req.body.ID, authorID: req.decoded.ID } })
                .then((row) => {
                    if (row > 0) {
                        res.json({ 
                            success: true, 
                            message: row + " row(s) updated", 
                            data: value 
                        });
                    } else {
                        res.json({ 
                            success: false, 
                            message: row + " row(s) updated" 
                        });
                    }
                })
        },
        delete: (req, res) => {
            models.post.destroy({
                where: { id: req.params.id }
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