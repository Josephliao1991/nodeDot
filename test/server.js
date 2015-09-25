var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

var apiGroup    = require('./router/apiGroup.js');
var apiAccount  = require('./router/apiAccount.js');
var apiiNeDot   = require('./router/apiiNeDot.js');
var apiCenter   = require('./router/apiCenter.js');
var apiCPush_test = require('./router/apiCPush_test.js');

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
app.use('/device/inedot',apiiNeDot)
app.use('/device/center',apiCenter)
app.use('/cpush_test',apiCPush_test)

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

  console.log("Server is Start Right Now, Enter Ctrl+C Twice Times If You Need To Close Service!");

})
