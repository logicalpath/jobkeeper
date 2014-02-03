
/**
 * Module dependencies.
 */


var express = require('express');
var routes = require('./routes');
var dbapplications = require('./routes/dbapplications');
var applications = require('./routes/applications');
var appl2 = require('./routes/appl2');
var rest = require('./routes/rest');
var http = require('http');
var path = require('path');
var mongoskin = require('mongoskin');
var db = mongoskin.db('mongodb://localhost:27017/jobdb?auto_reconnect', {safe:true});
var app = express();
app.use(function(req, res, next) {
  req.db = {};
  req.db.applications = db.collection('applications');
  next();
})
app.locals.appname = 'Job Keeper'

app.set('port', process.env.PORT || 3003);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser());
app.use(express.session({secret: '59B93087-78BC-4EB9-993A-A61FC844F6C9'}));
app.use(express.csrf());

app.use(require('less-middleware')({ src: __dirname + '/public', compress: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(function(req, res, next) {
  res.locals._csrf = req.session._csrf;
  return next();
})
app.use(app.router);

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}
app.param('application_id', function(req, res, next, applicationId) {
  req.db.applications.findById(applicationId, function(error, application){
    if (error) return next(error);
    if (!application) return next(new Error('Job application  is not found.'));
    req.application = application;
    return next();
  });
});

app.get('/', routes.index);
app.get('/applications', dbapplications.list);
app.get('/inplay', dbapplications.inplay);
app.post('/updatestat/:application_id', dbapplications.statusupdate);
app.post('/updateinperson/:application_id', dbapplications.inpersonupdate);
app.post('/updatephonei/:application_id', dbapplications.phoneiupdate);
app.post('/updatereject/:application_id', dbapplications.rejectionupdate);
app.post('/updatenote/:application_id', applications.updatenote);
app.del('/applications/:application_id', dbapplications.del);
app.get('/viewapp/:application_id', dbapplications.view);
app.get('/newapp', applications.newapp);
app.post('/addapp', applications.add);

app.all('*', function(req, res){
  res.send(404);
})
http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
