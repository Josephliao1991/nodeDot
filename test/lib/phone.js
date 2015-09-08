var express = require('express');
var router  = express.Router();

router.get('/create',function (req, res) {
  // body...
res.send("Phone Create!!")

})

router.get('/update',function (req, res) {
  // body...
  res.send("Phone Update!!")

})


module.exports = router;
