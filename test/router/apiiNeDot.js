var express = require('express');
var router = express.Router();

router.get('/test',function (req, res) {
  // body...
  res.send("Test Success,/device/inedot/test")

})



module.exports = router;
