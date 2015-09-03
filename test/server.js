var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');


//Connect TO MONGODB
var be_ip   = "10.240.72.88:80"
var dbName  = "myDatabase"
mongoose.connect('mongodb://'+be_ip+dbName)


var app = express();
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json({ type: 'application/vnd.api+json' }))
app.use(methodOverride())

var router1 = express.Router()

router1.get('/T1',function (req, res) {
  // body...
  res.send("T1")

})

app.use('/router1',router1)

app.listen(8080,function (error) {
  // body...
  if (error) {
    console.log(error);
  }

  console.log("Server is Start Right Now, Enter Ctrl+C Twice Times If You Need To Close Service!");

})
