var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var inedot = require('../lib/inedot.js');
var person = require('../lib/person.js');

router.post('/create',function (req, res) {
  // body...
  var macAddr_create        = req.body.macAddr
  var owner_create          = req.body.owner
  var connectState_create   = req.body.connectState
  var name_create           = req.body.name
  var battery_create        = req.body.battery
  var pushGroup_create      = req.body.pushGroup
  var situation_create      = req.body.situation

  inedot.create(macAddr_create, owner_create, connectState_create,
                name_create,  battery_create, pushGroup_create, situation_create,
        function (error, result) {
          // body...
          if (error) {
            return res.send(error)
          }
          if (result.result == false) {
            return res.json(result)
          }
          res.json(result)
        })


})



module.exports = router;
