var http = require("http"), url= require("url");

function onRequest (request, response) {
	var path_name = url.parse(request.url).pathname;
	console.log("Request "+path_name+ " Received.");
	if (typeof(routes[request.method+path_name])==='function') {
		routes[request.method+path_name](request, response);
	}
	else{
		response.end("No se ha encontrado tu pagina");
	}
}

	var routes={};

	exports.forRoute = function(method, path, handler){
		routes[method + path] = handler;
	};

	exports.start = function(){
		http.createServer(onRequest).listen(9999);
		console.log("El servidor se ha iniciado");
	};
