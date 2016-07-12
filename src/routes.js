var winston = require('winston');

var businessesIDRegex = /\/businesses\/[0-9a-zA-Z\-]{4,36}/;

module.exports = function(server){
  server.on('request',function(request,response){
    winston.info('incoming request', request.url);

    if(request.url == '/businesses'){
      getBusinessesIndex(request,response);
    }else if(request.url.match(businessesIDRegex)){
      getBusinessesById(request, response);
    }else {
      routeError(request,response);
    }
    response.end();
  })
}

function getBusinessesIndex(req,res){
  winston.info("getting whole business index!");
  res.setHeader('Content-Type', 'application/JSON');
}

function getBusinessesById(req,res){
  var items = req.url.split("/");
  winston.info("getting a business by id!", items[2]);
  res.setHeader('Content-Type', 'application/JSON');
}

function routeError(req,res){
  var errorMsg = "Unable to reach url:" +req.url;
  var statusMsg = {error: errorMsg};
  res.setHeader('Content-Type', 'application/JSON');
  res.statusCode = 404;
  res.write(JSON.stringify(statusMsg));
}
