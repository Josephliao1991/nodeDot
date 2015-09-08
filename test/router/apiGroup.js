var express = require('express');
var router = express.Router();
var group = require('../lib/group.js');

router.get('/find',function (req, res) {
  // body...
  res.send("Get Group Data")

})


module.exports = router
