var restify = require('restify');

var server = restify.createServer({
  name: 'MapStream'
});

server.get(/.*/, restify.serveStatic({
  'directory': './public',
  'default': 'index.html'
}));
// Start Server
server.listen(3001, function() {
  console.log('%s listening at %s', server.name, server.url);
});