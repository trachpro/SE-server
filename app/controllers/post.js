module.exports = function (models) {
    return {
        list: (req, res) => {
            var page = req.params.page ? parseInt(req.params.page) : 1;
            var limit = req.params.limit ? parseInt(req.params.limit) : 10;
            if (page < 1) page = 1;
            if (limit < 1 || limit > 20) limit = 10;
            models.post.findAll({ 
                attributes: ['ID', 'title', 'authorID', 'createdAt'],
                where: {status: 1},
                offset: (page - 1) * limit, limit: limit,
                include: [{
                    model: models.user,
                    as: 'author',
                    attributes: ['name'],
                }],
                order: [
                    ['createdAt', 'DESC']
                ] 
            }).then( (datas) => {
                res.json(datas || []);
            });
        },
        search: (req, res) => {
            var page = req.body.page ? parseInt(req.body.page) : 1;
            var limit = req.body.limit ? parseInt(req.body.limit) : 10;
            if (page < 1) page = 1;
            if (limit < 1 || limit > 20) limit = 10;

            var condition = {
                status: 1,
                $or: [{
                    title: {
                        $like: '%' + req.body.string + '%'
                    }
                }, {
                    content: {
                        $like: '%' + req.body.string + '%'
                    }
                }]
            }
            models.post.findAll({ offset: (page - 1) * limit, limit: limit, where: condition }).then((datas) => {
                res.json(datas || [])
            });
        },
        get: (req, res) => {
            const id = req.params.id;
            
            models.post.findOne({
                attributes: ['ID', 'title', 'content','authorID', 'createdAt','categoryID'],
                where: {id: req.params.id, status: 1},
                //add author's atributes
                include: [{
                    model: models.user,
                    as: 'author',
                    attributes: ['ID','name'],
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
                    status: true, 
                    message: "successful", 
                    data: data.dataValues });
            }).catch( err => {
                res.status(404).json({
                    status: false,
                    message: "Canot perform action"
                });
            })
        },
        insert: (req, res) => {

            models.post.create({
                authorID: req.decoded.ID,
                title: req.body.title,
                content: req.body.content,
                categoryID: req.body.categoryID,
                createdAt: Date.now(),
                status: 1,
            }).then((data) => {
                res.json({ 
                    status: true, 
                    message: "successful", 
                    data: data.dataValues 
                });
            }).catch( err => {
                if(err) {
                    res.status(404).json({ 
                        success: false, 
                        message: "Cannot perform action"
                    });
                }
            });
        },
        update: (req, res) => {
            var value = {
                editedAt: Date.now(),
            };
            if (req.body.title) value.title = req.body.title;
            if (req.body.content) value.content = req.body.content;
            if (req.body.categoryID) value.categoryID = req.body.categoryID;

            models.post.update(value, { where: { ID: req.body.ID, authorID: req.decoded.ID, status: 1 } })
                .then((row) => {
                    if (row > 0) {
                        res.json({ 
                            status: true, 
                            message: row + " row(s) updated", 
                            data: value 
                        });
                    } else {
                        res.json({ 
                            status: false, 
                            message: row + " row(s) updated" 
                        });
                    }
                })
        },
        delete: (req, res) => {
            var value = {
                status: 0,
                deletedAt: Date.now()
            }
            models.post.update({
                value,
                where: { ID: req.params.id, authorID: req.decoded.ID }
            })
                .then( row => {
                    if (row > 0)
                        res.json({ 
                            status: true, 
                            message: rows + " row(s) affected" 
                        });
                    else
                        res.status(300).json({ 
                            status: false, 
                            message: rows + " row(s) affected" 
                        });
                });
        }
    }
}