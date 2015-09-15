var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var group = require('../lib/group.js');

// //Connect TO MONGODB
// var be_ip   = "10.240.72.88:80"
// var dbName  = "/myDatabase"
// mongoose.connect('mongodb://'+be_ip+dbName)

router.get('/findAll',function (req, res) {
  // body...
  var _id_find = req.query._id
  group.findGroupAll(_id_find,function (error,groups) {
    // body...
    res.json(groups)

  })

})

router.get('/findById',function (req, res) {
  // body...
  var _id_find = req.query._id
  group.findGroupById(_id_find,function (error,group) {
    // body...
    res.json(group)

  })

})

router.get('/create',function (req, res) {
  // body...
  var leader_create = req.query.leader
  var name_create   = req.query.name
  var listenDevice_create = []

  if (!leader_create || !name_create || !listenDevice_create) {
    return res.json({result : "fail,lost some params"})
  }

  group.createGroup(leader_create, name_create, function (error, result) {
    // body...
    if (error) {
      return res.send(error)
    }
    res.json(result)

  })

})

router.get('/updateLeader',function (req, res) {
  // body...
  var _id_update    = req.query._id
  var leader_update = req.query.leader
  var name_update   = req.query.name
  var member_update = req.query.member
  var listenDevice_update = req.query.listenDevice

  if (!_id_update) {
    return res.json({result : "fail,lost some params"})
  }

  group.updateGroupLeader(_id_update, leader_update, name_update,
    function (error, result) {
    // body...
    if (error) {
      return res.send(error)
    }
    res.json(result)

  })

})

router.get('/addMember',function (req, res) {
  // body...
  var _id_add = req.query._id
  var member_id_add  = req.query.member_id

  group.addGroupMember(_id_add, member_id_add, function (error, result) {
    // body...
    if (error) {
      return res.send(error)
    }

    res.json(result)

  })

})

router.get('/deleteMember',function (req, res) {
  // body...
  var _id_delete = req.query._id
  var member_id_delete  = req.query.member_id

  group.deleteGroupMember(_id_delete, member_id_delete, function (error, result) {
    // body...
    if (error) {
      return res.send(error)
    }

    res.json(result)

  })

})

router.get('/deleteById',function (req, res) {
  // body...
  var _id_delete = req.query._id

  if (!_id_delete) {
    return res.json({result : "fail,lost some params"})
  }

  group.deleteGroupById(_id_delete, function (error,result) {
    // body...
    if (error) {
      return res.send(error)
    }

    res.json(result)

  })
})


module.exports = router
