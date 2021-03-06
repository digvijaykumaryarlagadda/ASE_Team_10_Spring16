var restify     =   require('restify');
var mongojs     =   require('mongojs');
var	morgan  	= 	require('morgan');
var db          =   mongojs('mongodb://user1:user1@ds049854.mlab.com:49854/my_rest_services', ['users','bucketLists']);
var server      =   restify.createServer();

server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser());
server.use(restify.bodyParser());
server.use(morgan('dev')); // LOGGER

// CORS
server.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

server.listen(process.env.PORT || 9804, function () {
    console.log("Server started @ ", process.env.PORT || 9804);
});

var manageUsers =   require('./auth/manageUser')(server, db);
var manageLists =   require('./list/manageList')(server, db);