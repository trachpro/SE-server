module.exports = function(config, db) {

	var fs = require('fs');
	const MODEL_PATH = config.root + '/app/models';
	const CTRL_PATH = config.root + '/app/controllers';
	var obj = {};
    
    obj.queryToJson = function(str) {
        if (typeof str !== 'string') {
            return {};
        }

        str = str.trim().replace(/^(\?|#|&)/, '');

        if (!str) {
            return {};
        }
        
        return str.split('&').reduce(function (ret, param) {
            var parts = param.replace(/\+/g, ' ').split('=');
            var key = parts.shift();
            var val = parts.length > 0 ? parts.join('=') : undefined;

            key = decodeURIComponent(key);

            val = val === undefined ? null : decodeURIComponent(val);

            if (!ret.hasOwnProperty(key)) {
                ret[key] = val;
            } else if (Array.isArray(ret[key])) {
                ret[key].push(val);
            } else {
                ret[key] = [ret[key], val];
            }

            return ret;
        }, {});
    }

	obj.getModelNames = function() {
		var names = [];
		var modelsPath = config.root + '/app/models';
		fs.readdirSync(modelsPath).forEach(function(file) {
			names.push(file.replace('.js', ''));
		});
	  	return names;
	}

	obj.loadModels = function() {
		// config mongoose models
		var model_list = {};
		fs.readdirSync(MODEL_PATH).forEach(function (file) {
			if (file.indexOf('.js') >= 0) 
				model_list[file.replace('.js', '')] = obj.loadModel(file, db.sequelize, db.Sequelize);
		})
	  	return model_list;
	}

	obj.loadModel = function(name) {
		return require(MODEL_PATH + '/' + name)(db.sequelize, db.Sequelize);
	}

	obj.loadController = function(name) {
		return require(CTRL_PATH + '/' + name)(obj.loadModel(name));
	}

	obj.loadControllerFromModel = function(name, model, model2) {
		return require(CTRL_PATH + '/' + name)(model);
	}

	obj.loadControllers = function(models) {
		var ctrls = {};
		//Relations  	
		models.post.belongsTo(models.user, {
    		foreignKey: 'author_id',
			targetKey: 'id',
			as: 'author'
		});
		models.user.hasMany(models.post, {
    		foreignKey: 'author_id',
    		targetKey: 'id'
		});
		fs.readdirSync(CTRL_PATH).forEach(function (file) {
		    if (file.indexOf('.js') >= 0) {
		    	ctrls[file.replace('.js', '')] = obj.loadControllerFromModel(file, models[file.replace('.js', '')], models.user);
		    	console.log('Loaded: ' + file.replace('.js', '') + ' controllers.');
		    }
		  });
	  	return ctrls;
	}

	obj.loadAllControllers = function(models) {
		var ctrls = {};
		//Relations  	
		models.post.belongsTo(models.user, {
    		foreignKey: 'author_id',
			targetKey: 'id',
			as: 'author'
		});
		models.user.hasMany(models.post, {
    		foreignKey: 'author_id',
    		targetKey: 'id'
		});

		models.post.hasMany(models.comment, {
			foreignKey: 'post_id'
		})
		models.comment.belongsTo(models.user, {
			foreignKey: 'author_id',
			as: 'commentator'
		})

		fs.readdirSync(CTRL_PATH).forEach(function (file) {
		    if (file.indexOf('.js') >= 0) {
		    	ctrls[file.replace('.js', '')] = obj.loadControllerFromModel(file,models);
		    	console.log('Loaded: ' + file.replace('.js', '') + ' controllers.');
		    }
		  });
		return ctrls;
	}

	return obj;

}