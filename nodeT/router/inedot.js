var express = require('express');
var router  = express.Router();

router.get('/create',function (req, res) {
  // body...
  res.send("iNeDot Create!!")

})

router.get('/update',function (req, res) {
  // body...
res.send("iNeDot Update!!")

})
