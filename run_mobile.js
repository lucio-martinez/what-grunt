var finalhandler = require('finalhandler');
var http = require('http');
var serveStatic = require('serve-static');

// Serve up public folder
var serve = serveStatic('webapps/mobile/dist', {
  'index': 'index.html'
});

// Create server
var server = http.createServer(function(req, res) {
  var done = finalhandler(req, res);
  serve(req, res, done);
});

// Listen
server.listen(8080);
console.log('Server running at http://localhost:8080/');
