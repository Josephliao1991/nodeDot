var express = require('express');
// var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

var apiGroup = require('./router/apiGroup.js');

var app = express();
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json({ type: 'application/vnd.api+json' }))
app.use(methodOverride())


app.use('/group',apiGroup);



app.listen(8080,function (error) {
  // body...
  if (error) {
    console.log(error);
  }

  console.log("Server is Start Right Now, Enter Ctrl+C Twice Times If You Need To Close Service!");

})
