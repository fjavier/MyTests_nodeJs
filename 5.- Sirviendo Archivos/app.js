var server = require('./server.js');
var fs = require('fs'), path = require('path');
var root = __dirname;

var serveStatic = function (response, file) {
	var fileToServe= path.join(root, file);
	var stream = fs.createReadStream(fileToServe);
	stream.pipe(response)
/*
	stream.on('data',function (chunk) {
		response.write(chunk);
	});

	stream.on('end',function () {
		response.end();
	});
*/
}

server.forRoute("GET", "/echo", function(request, response){
	serveStatic(response, "echo.html");
});

server.forRoute("POST","/echo", function (request, response) {
	var incoming ="";
	
	request.on('data',function (chunk) {
		incoming+=chunk.toString();
	});

	request.on('end',function () {
		response.write(incoming);
		response.end();
	});
});

server.start();
