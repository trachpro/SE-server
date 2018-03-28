module.exports = function (app, utils, models) {
  var Auth = require('../app/lib/auth')(app, utils);
  var ctrls = utils.loadAllControllers(models);
  var names = utils.getModelNames();
  app.get('/api', (req, res) => {
    res.render('index')
  })
  //set get default api
  
  names.forEach(function (name) {
    console.log('Route /' + name + " completed.");
    app.get('/api/' + name + '/:limit([0-9]+)/:page([0-9]+)', ctrls[name].list); // get list with page
    app.get('/api/' + name, ctrls[name].list); // get list with default page = 1
    app.get('/api/' + name + '/:id([0-9a-f]+)', ctrls[name].get); // get by id
    app.post('/api/' + name + '/search', ctrls[name].search); // search
    app.post('/api/' + name ,Auth.setMiddleware, ctrls[name].insert); // insert
    app.put('/api/' + name ,Auth.setMiddleware, ctrls[name].update); // update
    app.delete('/api/' + name + '/:id([0-9a-f]+)',Auth.setMiddleware, ctrls[name].delete); // delete
  });
    app.post("/api/login",Auth.login);
    app.post("/api/image", Auth.errHandling, Auth.uploadImage);
  // catch-all
  app.get('*', function (req, res) { res.status(404).json({ error: 'Invalid GET request' }) })
  app.post('*', function (req, res) { res.status(404).json({ error: 'Invalid POST request' }) })
  app.delete('*', function (req, res) { res.status(404).json({ error: 'Invalid DELETE request' }) })
}