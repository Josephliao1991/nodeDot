var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-Parser');
var methodOverride = require('method-override');


//Connect TO MONGODB
var be_ip   = "10.240.72.88:80"
var dbName  = "myDatabase"
mongoose.connect('mongodb://'+be_ip+dbName)


var app = express();
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended: true}))
app.use(bodyparser.json({ type: 'application/vnd.api+json' }))
app.use(methodOverride())

var router1 = app.Router()

router.get('/T1',function (req, res) {
  // body...
  res.send("T1")

})

app.use('/router1',router1)

app.listen(8080)
