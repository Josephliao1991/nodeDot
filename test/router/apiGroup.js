var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var group = require('../lib/group.js');
var person = require('../lib/person.js');

// //Connect TO MONGODB
// var be_ip   = "10.240.72.88:80"
// var dbName  = "/myDatabase"
// mongoose.connect('mongodb://'+be_ip+dbName)

router.get('/findAll',function (req, res) {
  // body...
  var _id_find = req.query._id
  group.findAll(_id_find,function (error,groups) {
    // body...
    res.json(groups)
  })
})

router.get('/findById',function (req, res) {
  // body...
  var _id_find = req.query._id
  group.findById(_id_find,function (error,group) {
    // body...
    res.json(group)
  })
})


router.get('/findByLeader',function (req, res) {
  // body...
  var person_id_find = req.query.person_id
  group.findByLeader(person_id_find,function (error,group) {
    // body...
    res.json(group)
  })
})


router.post('/create',function (req, res) {
  // body...
  var leader_create = req.query.leader    //person_id
  var name_create   = req.query.name      //String : GroupName

  if (!leader_create || !name_create) {
    return res.json({result : "fail,lost some params"})
  }

  //1.Check Person is Exist
  person.checkExistById(leader_create, function (error, exist) {
    // body...
    if (!exist) {
      return res.json({result : "fail,person is not regist"})
    }
    //2.Create Group
    group.create(leader_create, name_create, function (error, result) {
      // body...
      if (error) {
        return  res.send(error)
      }
      if (result.result == false) {
        return  res.json(result)
      }

      //3.Add GroupId ref to Person
      var group = result.data
      person.addSelfGroup(leader_create, group._id, function (error, result) {
        // body...
        if (error) {
          return  res.send(error)
        }
        if (result.result == false) {
          return  res.json(result)
        }

        res.json(result)

      })
    })
  })
})


//Change Method To UpdateGroupName
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

  group.updateLeader(_id_update, leader_update, name_update,
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
  var member_name_add = req.query.member_name
  group.addMember(_id_add, member_id_add, member_name_add, function (error, result) {
    // body...
    if (error) {
      return res.send(error)
    }
    //Save To Person.GroupID



    res.json(result)

  })

})

router.get('/deleteMember',function (req, res) {
  // body...
  var _id_delete = req.query._id
  var member_id_delete  = req.query.member_id

  group.deleteMember(_id_delete, member_id_delete, function (error, result) {
    // body...
    if (error) {
      return res.send(error)
    }
    //Save To Person.GroupID



    res.json(result)

  })

})

router.get('/deleteById',function (req, res) {
  // body...
  var _id_delete = req.query._id

  if (!_id_delete) {
    return res.json({result : "fail,lost some params"})
  }
  //get all member first
  //remove member groupID Array Secnod


  group.deleteById(_id_delete, function (error,result) {
    // body...
    if (error) {
      return res.send(error)
    }

    res.json(result)

  })
})


module.exports = router
