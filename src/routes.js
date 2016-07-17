var winston = require('winston');
var data = require('./data.js');

var businessesIDRegex = /\/businesses\/[0-9a-zA-Z\-]{36,36}/;

module.exports = function(server){
  server.on('request',function(request,response){
    winston.info('incoming request', request.url);
    if(request.method=="GET"){
      //seperate the url from the passed arguements
      var splitUrl = request.url.split("?");
      if(splitUrl[0] == '/businesses'){
        getBusinessesIndex(request,response, splitUrl);
      }else if(splitUrl[0].match(businessesIDRegex)){
        getBusinessesById(request, response);
      }else {
        routeError(request,response);
      }
    }
    else {
      routeError(request,response);
    }
    response.end();
  })
}

function getBusinessesIndex(req,res,splitUrl){
  var args = {};
  if(splitUrl[1]){
    //convert the arguements in the url to an object;
    var args = JSON.parse('{"'+decodeURI(splitUrl[1]).replace(/"/g,'\\"').replace(/&/g,'","').replace(/=/g,'":"') + '"}');
  }
  res.setHeader('Content-Type', 'application/JSON');
  var slice = data.getBusinessesIndex(args);
  res.statusCode = 200;
  slice.message = "slice found";
  res.end(JSON.stringify(slice))
}

function getBusinessesById(req,res){
  var items = req.url.split("/");
  var business = data.getBusinessesById(items[2]);
  winston.info("Found Business:", business);
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/JSON');
  res.end(JSON.stringify({
    message:"Business found",
    data:business
  }));
}

function routeError(req,res){
  var errorMsg = "Unable to reach url:" +req.url +" with method "+req.method;
  var statusMsg = {error: errorMsg};
  res.setHeader('Content-Type', 'application/JSON');
  res.statusCode = 404;
  res.write(JSON.stringify(statusMsg));
}
