//Carga de librerias
var express = require('express'), 
http=require('http'), 
path = require('path'), 
routes=require('./routes');

var app= express();

app.configure(function () {
	//Puerto
	app.set('port', process.env.PORT || 3000);
	//vistas
	app.set('views',__dirname+'/views');
	//Motor de plantillas
	app.set('view engine', 'jade');
	//Favicon
	app.use(express.favicon());
	//logger
	app.use(express.logger('dev'));
	//Salida de multiples formatos
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	//enrutador
	app.use(app.router);
	//Staticos
	app.use(express.static(path.join(__dirname,'public')));
});

app.configure('development', function(){
	app.use(express.errorHandler());
});

app.get('/', routes.index);

http.createServer(app).listen(app.get('port'), function(){
	console.log("Servidor Express escuchando desde el puerto: " + app.get('port'));
});
