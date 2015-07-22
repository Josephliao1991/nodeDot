var http = require('http');
var express = require('express');
var bodyparser = require('body-parser');

  var app = express();

  app.use(bodyparser.json())
  app.use(bodyparser.urlencoded({
    extended: true
  }))

  app.get('/',function(request,response){

    response.end("Hello world");

  });

  app.get('/family',function(request, response){

    response.end("Get family");

  });

  app.post('/family',function(request, response){

    var familyKey = request.body.familyKey;
    response.end("Post family : " + familyKey);

  });

  app.put('/family/:id',function(request, response){
    // body...
    var id = request.params.id
    if (id == "abc123") {

      var familyKey = request.body.familyKey;
      response.end("Put family : " + familyKey);
    }else {

      response.end("Wrong id");
    }
  })

  app.delete('/family/:id',function(request, response){
    // body...
    var id = request.params.id
    if (id == "abc123") {
      response.end("Delete family")
    }else {
      response.end("Wrong Id")
    }

  })


  app.listen(8888)
  console.log("server start");
