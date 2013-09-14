var http = require("http"), url= require("url");

function onRequest(request, response){
	var path_name = url.parse(request.url).pathname;
	console.log("Request for"+path_name + "received");
	if(path_name=="/start"){
		response.write("Hello");
		response.end();
	}
		else if(path_name=="/finish"){
			response.write("Good Bye");
			response.end();
		}
			else{
			response.write("Sorry about that, the page is not found code:404");		
			response.end("404 not found");
			}
}

http.createServer(onRequest).listen(8080);
console.log("Server has started");
