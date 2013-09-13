var express = require('express'),routes = require('./routes'),http = require('http'),path = require('path');

var app = express();

app.configure(function(){
	//Puerto
	app.set('port', process.env.PORT || 3000);
	//vistas
	app.set('views', __dirname + '/views');
	//Motor de plantillas
	app.set('view engine', 'jade');
	//favIcon de la app
	app.use(express.favicon());
	//logger en desarrollo
	app.use(express.logger('dev'));
	//usado para multiples formato
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	//enrutador
	app.use(app.router);
	//directorio donde se encontraran los css, js, img etc
	app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
	app.use(express.errorHandler());
});

app.get('/', routes.index);

http.createServer(app).listen(app.get('port'), function(){
	console.log("Servidor Express escuchando desde el puerto: " + app.get('port'));
});

