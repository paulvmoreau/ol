var winston = require('winston');
var csv = require('csv');
var fs = require('fs');
var _ = require('lodash');

var csvData = null;

module.exports = {
  getBusinessesIndex:function(args){
    var pageSize = 50;
    var pageNo = 1;
    if(args){
      if(args.pageSize){
        pageSize = parseInt(args.pageSize);
      }
      if(args.page){
        pageNo = parseInt(args.page);
      }
    }

    var totalPages = Math.ceil(csvData.length/pageSize);
    if(pageNo > totalPages){
      pageNo = totalPages;
    }
    var offset = (pageNo-1) * pageSize;
    var csvSlice = {
      page : pageNo,
      totalPages : totalPages,
      totalEntries: csvData.length,
      businesses: csvData.slice(offset,offset+pageSize),
    }
    return csvSlice;
  },
  getBusinessesById:function(bID){
    return _.find(csvData,{"uuid":bID});
  },
  initData:function(cb){
    fs.readFile('data/engineering_project_businesses.csv',function(err,csvContents){

      if(err) return cb(err)

      var options ={
        columns : true
      };

      csv.parse(csvContents,options,function (err,data){
        if(err) return cb(err);
        csvData = _.sortBy(data,function(b) { return parseInt(b.id); }); //need to parse int here as sorting by string will have odd behaviour. 

        return cb();
      });
    })
  },
}
