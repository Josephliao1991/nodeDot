var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

var apiGroup    = require('./router/apiGroup.js');
var apiAccount  = require('./router/apiAccount.js');
var apiDevice   = require('./router/apiDevice.js');

var app = express();
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json({ type: 'application/vnd.api+json' }))
app.use(methodOverride())

//Connect TO MONGODB
var be_ip   = "10.240.17.142:80"
var dbName  = "/mongoTest"
mongoose.connect('mongodb://'+be_ip+dbName)
app.get('/',function (req, res) {
  // body...
  res.send("Hellow World! This is iNeDot Server!!")

})
app.use('/group',apiGroup);
app.use('/account',apiAccount)
app.use('/device',apiDevice)


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


var dbref = require('./dbref.js');
app.get('/dbref',function (req, res) {
  // body...
  // dbref.dbrefTest();
  dbref.dbrefTest(function (error, result) {
    // body...

    res.json(result)

  });
})

app.get('/findStory',function (req, res) {
  // body...
  dbref.findStory(function (error, result) {
    // body...
    res.json(result)

  })

})

app.get('/deleteStory',function (req, res) {
  // body...
dbref.deleteStory(function (error, result) {
  // body...
res.json(result)

})

})

app.get('/deleteStories',function (req, res) {
  // body...
dbref.deleteStories(function (error, result) {
  // body...
  res.json(result)
})

})

app.listen(80,function (error) {
  // body...
  if (error) {
    console.log(error);
  }

  console.log("iNeDot Server is Start Right Now, Enter Ctrl+C Twice Times If You Need To Close Service!");

})
