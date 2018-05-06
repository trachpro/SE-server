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
    app.post('/api/' + name + '/search', ctrls[name].search); // search
    if (name != 'user') {
      app.get('/api/' + name + '/:id([0-9a-f]+)', ctrls[name].get); // get by id
      app.post('/api/' + name ,Auth.setMiddleware, ctrls[name].insert); // insert
    }
    app.put('/api/' + name ,Auth.setMiddleware, ctrls[name].update); // update
    app.delete('/api/' + name + '/:id([0-9a-f]+)',Auth.setMiddleware, ctrls[name].delete); // delete
  });
    app.get("/api/user/:id([0-9a-f]+)",Auth.setMiddleware,ctrls['user'].get); // require log in to view profile
    app.post("/api/user", ctrls['user'].insert) // register new user
    app.post("/api/login",Auth.login);
    app.post("/api/image", Auth.setMiddleware, Auth.uploadImage);
    app.post("/api/forgetpassword",Auth.resetPassword);
    app.get("/api/refreshToken", Auth.setMiddleware, Auth.refreshToken);
  // catch-all
  app.get('*', function (req, res) { res.status(404).json({ error: 'Invalid GET request' }) })
  app.post('*', function (req, res) { res.status(404).json({ error: 'Invalid POST request' }) })
  app.delete('*', function (req, res) { res.status(404).json({ error: 'Invalid DELETE request' }) })
}