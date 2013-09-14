var server = require('./server.js');

server.forRoute("GET","/start",function (request, response) {
	response.write("Hola Te deseo un lindo dia....!!");
	response.end();
});

server.forRoute("GET","/finish",function (request, response) {
	response.write("Adios, que te vaya bien!!");
	response.end();
});

server.forRoute("GET","/echo", function (request, response) {
		var body = '<html>'
				+'<head><title>NodeJs</title><head>'+
				'<body> <form method="POST">'+
				'<input type="text" name="msg"/>'+
				'<input type="submit" value="echo"/>'+
				'</form>'+
				'</body></html>';
				response.write(body);
				response.end();
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
