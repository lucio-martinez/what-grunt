var finalhandler = require('finalhandler');
var http = require('http');
var serveStatic = require('serve-static');

// Serve up public folder
var serve = serveStatic('../webapps/desktop/');
// To see the production version enable following comment
//var serve = serveStatic('../webapps/desktop/dist');

// Create server
var server = http.createServer(function(req, res) {
  var done = finalhandler(req, res);
  serve(req, res, done);
});

// Listen
server.listen(8080);
console.log('Server running at http://localhost:8080/');
