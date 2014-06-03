
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' === app.get('env')) {
  app.use(express.errorHandler());
}

// routing setting
require('./router.js').route(app);

// create connection pool for MongoDB, just do it once when server has created.
require('./db.js').connect();

//create http server
http.createServer(app).listen(app.get('port'), function() {
	console.log("KanbanBoard server listening on port " + app.get('port'));
});
