module.exports = function (models) {
    return {
        list: (req, res) => {
            
        },
        search: (req, res) => {
            
        },
        get: (req, res) => {
            const ID = req.params.id;
            models.comment.findById(ID).then((data) => {
                if(data) {
                    res.json({ 
                        status: true, 
                        message: "successful", 
                        data: data.dataValues }); 
                } else {
                    res.json({
                        status: false,
                        message: "Cannot perform action"
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
            models.comment.create({
                postID: req.body.postID,
                authorID: req.decoded.ID,
                content: req.body.content,
                creadAt: Date.now()
            }).then((data) => {
                res.json({ 
                    status: true, 
                    message: "1 row(s) inserted", 
                    data: data.dataValues });
            }).catch((err) => {
                res.json({ 
                    status: false, 
                    msg: "Cannot perform action" 
                });
            });
        },
        update: (req, res) => {
            var value = {
                content: req.body.content,
                editedAt: Date.now()
            };
            var condition = {
                authorID: req.decoded.ID,
                ID: req.body.ID
            }
            models.comment.update(value, { where: condition })
                .then((row) => {
                    if (row > 0) {
                        res.json({ 
                            status: true, 
                            message: "Comment updated", 
                            data: value 
                        });
                    } else {
                        res.json({ 
                            status: false, 
                            message: "Update failed" 
                         });
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
                deletedAt: Date.now()
            }
            models.comment.update({
                value,
                where: { ID: req.params.id, authorID: req.decoded.ID }
            })
                .then( row => {
                    if (row > 0)
                        res.json({ 
                            status: true, 
                            message: "Comment deleted" 
                        });
                    else
                        res.json({ 
                            status: false, 
                            message: "Cannot delete comment" 
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