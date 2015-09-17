var express = require('express');
var router  = express.Router();

var mongoose = require('mongoose');
var person = require('../lib/person.js');


router.get('/findAll',function (req, res) {
  // body...
  person.findAll(function (error,people) {
    // body...
    res.json(people)
  })
})

router.get('/findById',function (req, res) {
  // body...
  var _id_find = req.query._id

  if (!_id_find) {
    return res.json({result : false,
                     message : "fail,lost some params"})
  }

  person.findById(_id_find,function (error,person) {
    // body...
    res.json(person)
  })
})



router.post('/regist',function (req, res) {
  // body...
  var ssid_regist = req.body.ssid
  var pwd_regist  = req.body.pwd

  if (!ssid_regist || !pwd_regist) {
    return res.json({result : false,
                     message : "fail,lost some params"})
  }

  person.create(ssid_regist, pwd_regist, function (error, result) {
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


module.exports = router
