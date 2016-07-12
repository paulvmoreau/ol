var winston = require('winston');
var http = require('http');
var routes = require('./routes.js');
const PORT=8888;



//Create a server
var server = http.createServer();

routes(server);
//Lets start our server
server.listen(PORT, function(){
    //Callback triggered when server is successfully listening. Hurray!
    winston.info("Server listening on: http://localhost:%s", PORT);
});
