var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

var api = require('./api.js');

var app = express();
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json({ type: 'application/vnd.api+json' }))
app.use(methodOverride())

//Connect TO MONGODB
var be_ip   = "10.240.17.142:80"
var dbName  = "/asyncTest"
mongoose.connect('mongodb://'+be_ip+dbName)

app.get('/',function (req, res) {
  // body...
  res.send("Hellow World! This is iNeDot Server!!")
})

app.use('/api',api)

app.listen(80,function (error) {
  // body...
  if (error) {
    console.log(error);
  }

  console.log("Server is Start Right Now, Enter Ctrl+C Twice Times If You Need To Close Service!");

})
