var express = require('express');
var router = express.Router();
var apiiNeDot = require('./apiiNeDot.js');

router.use('/inedot',apiiNeDot)



module.exports = router
