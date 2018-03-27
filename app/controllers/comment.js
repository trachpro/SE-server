module.exports = function (models) {
    return {
        list: (req, res) => {
            var page = req.params.page ? parseInt(req.params.page) : 1;
            var limit = req.params.limit ? parseInt(req.params.limit) : 10;
            if (page < 1) page = 1;
            if (limit < 1 || limit > 20) limit = 10;
            models.category.findAll({ offset: (page - 1) * limit, limit: limit }).then((datas) => {
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

            models.category.findAll({ offset: (page - 1) * limit, limit: limit, where: cond }).then((datas) => {
                res.json(datas || [])
            });
        },
        get: (req, res) => {
            const id = req.params.id;
            models.category.findById(id).then((data) => {
                res.json({ "status": "200", "message": "successful", "data": data.dataValues });
            });
        },
        insert: (req, res) => {
            models.category.create({
                author_id: req.decoded.id,
                title: req.body.title,
                content: req.body.content
            }).then((data) => {
                console.log("success ", data);
                res.json({ "status": "200", "message": "1 row(s) inserted", "data": data.dataValues });
            }).catch((err) => {
                res.json({ "status": "404", "msg": err.errors[0].message});
            });
        },
        update: (req, res) => {
            var value = {
                id: req.params.id,
                name: req.body.name,
                age: req.body.age,
                email: req.body.email
            };
            models.category.update(value, { where: { id: value.id } })
                .then((row) => {
                    if (row > 0) {
                        res.json({ "status": "200", "message": row + " row(s) updated", "data": value });
                    } else {
                        res.json({ "status": "200", "message": row + " row(s) updated" });
                    }
                });
        },
        delete: (req, res) => {
            models.category.destroy({
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