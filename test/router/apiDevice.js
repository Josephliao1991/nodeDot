var express = require('express');
var router = express.Router();
var apiiNeDot = require('./apiiNeDot.js');
var apiCenter = require('./apiCenter.js');

router.use('/inedot',apiiNeDot)
router.use('/center',apiCenter)


module.exports = router
