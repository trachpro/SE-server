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
           
        },
        get: (req, res) => {
            
        },
        insert: (req, res) => {
           
        },
        update: (req, res) => {
            
        },
        delete: (req, res) => {
            
        }
    }
}