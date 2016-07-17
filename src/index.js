var winston = require('winston');
var http = require('http');
var routes = require('./routes.js');
var data = require('./data.js');
const PORT=8888;


data.initData(function(err){
  if(!err){
    //Create a server
    var server = http.createServer();
    routes(server);

    server.listen(PORT, function(){
      //Callback triggered when server is successfully listening. Hurray!
      winston.info("Server listening on: http://localhost:%s", PORT);
    })
  }else{
    winston.error("failed to load Data", err);
  }

});
