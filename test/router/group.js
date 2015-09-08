require('../lib/dbModel');
var mongoose = require('mongoose');

var express = require('express');
var router  = express.Router();

router.get('/create',function (req, res) {
  // body...
  res.send('Group Is Created Now!!')

})


// module.exports  = {
//
//   router  : router
//
// }
