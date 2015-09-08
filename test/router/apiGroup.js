var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var group = require('../lib/group.js');

//Connect TO MONGODB
var be_ip   = "10.240.72.88:80"
var dbName  = "myDatabase"
mongoose.connect('mongodb://'+be_ip+dbName)

router.get('/find',function (req, res) {
  // body...
  res.send("Get Group Data")

})


module.exports = router
