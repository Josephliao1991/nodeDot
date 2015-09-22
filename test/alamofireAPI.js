var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

var app = express();
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json({ type: 'application/vnd.api+json' }))
app.use(methodOverride())

app.get('/alamofireGET',function (req, res) {
  // body...
  if (!req.query.name) {
    return res.send({resutl : "FAIL"})
  }

  var name    = req.query.name+''
  var NAME = name.toUpperCase();

  res.send({resutl : NAME});

})

app.post('/alamofirePOST',function (req, res) {
  // body...
  if (!req.body.name) {
    return res.send({resutl : "FAIL"})
  }

  var name    = req.body.name+''
  var NAME = name.toUpperCase();

  res.send({resutl : NAME});

})

app.listen(8080,function (error) {
  // body...
  if (error) {
    console.log(error);
  }

  console.log("AlamoFire Server is Start Right Now,\n Enter Ctrl+C Twice Times If You Need To Close Service!");

})
