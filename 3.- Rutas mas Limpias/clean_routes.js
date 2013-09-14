var http = require("http"), url = require("url");

var route = {
	routes:{},
	for: function(path,handler){this.routes[path]=handler;
	}
};

route.for("/start", function(request, response){
	response.write("Hello");
	response.end();
});

route.for("/end", function(request, response){
	response.write("Good Bye");
	response.end();
});

function onRequest(request, response){
	var path_name = url.parse(request.url).pathname;
	console.log("Request for "+path_name+" Received");
	
	if(typeof route.routes[path_name] ==='function'){
		route.routes[path_name](request, response);
	}else{
		response.writeHead(404, {"Content-Type": "text/plain"});
		response.end("404 Not Found");
	}
}
	http.createServer(onRequest).listen(8080);
	console.log("Server has started");