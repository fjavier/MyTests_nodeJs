var http = require("http"), url = require("url");

var route = {
	routes:{},
	for: function(method,path,handler){
		this.routes[method+path]=handler;
	}
}

route.for("GET","/start",function(request,response){
	response.write("Hello");
	response.end();
});

route.for("GET","/end",function(request,response){
	response.write("bye bye..!!");
	response.end();
});

route.for("POST","/echo", function (request, response) {
	var incoming ="";
	
	request.on('data',function (chunk) {
		incoming+=chunk.toString();
	});

	request.on('end',function () {
		response.write(incoming);
		response.end();
	});
});

route.for("GET","/echo",function (request, response) {
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


function onRequest(request, response){
	var path_name = url.parse(request.url).pathname;
	console.log("Request"+path_name+"received");
	if(typeof (route.routes[request.method+path_name])==='function'){
		route.routes[request.method+path_name](request,response);
	}
	else{
		response.write("Not found:404");
		response.end();
	}
}

http.createServer(onRequest).listen(8080);
console.log("Server has Started");
