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
  group.findAll(function (error,groups) {
    // body...
    res.json(groups)
  })
})

router.get('/findById',function (req, res) {
  // body...
  var _id_find = req.query._id

  if (!_id_find) {
    return res.json({result : false,
                     message : "fail,lost some params"})
  }

  group.findById(_id_find,function (error,group) {
    // body...
    //1. find leader first
    person.findById(group.leader, function (error, leader) {
      // body...
      group.leader = leader
      res.json({_id : group._id,
                leader : leader,
                name  : group.name,
                members : group.members,
                date  : group.date})

    })
  })
})


router.get('/findByLeader',function (req, res) {
  // body...
  var person_id_find = req.query.person_id

  if (!person_id_find) {
    return res.json({result : false,
                     message : "fail,lost some params"})
  }

  group.findByLeader(person_id_find,function (error,group) {
    // body...
    res.json(group)
  })
})


router.post('/create',function (req, res) {
  // body...
  var leader_create = req.body.leader    //person_id
  var name_create   = req.body.name      //String : GroupName

  if (!leader_create || !name_create) {
    return res.json({result : false,
                     message : "fail,lost some params"})
  }

  //1.Check Person is Exist
  person.checkExistById(leader_create, function (error, exist) {
    // body...
    if (!exist) {
      return res.json({result : false,
                       message : "fail,person is not regist"})
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
router.post('/updateName',function (req, res) {
  // body...
  var _id_update    = req.body._id
  var name_update = req.body.name

  if (!_id_update || !name_update) {
    return res.json({result : false,
                     message : "fail,lost some params"})
  }

  group.updateName(_id_update, name_update,
    function (error, result) {
    // body...
    if (error) {
      return res.send(error)
    }
    res.json(result)

  })

})

router.post('/addMember',function (req, res) {
  // body...
  var _id_add = req.body._id
  var member_id_add  = req.body.member_id

  if (!_id_add || !member_id_add) {
    return res.json({result : false,
                     message : "fail,lost some params"})
  }

  //1.Check Person is Exist
  person.checkExistById(member_id_add, function (error, exist) {
    // body...
    if (!exist) {
      return res.json({result : false,
                       message : "fail,person is not regist"})
    }
    //2. Add Member To Group
    group.addMember(_id_add, member_id_add, function (error, result) {
      // body...
      if (error) {
        return res.send(error)
      }
      if (result.result == false) {
        return res.json(result)
      }
      //3.Add GroupID To Person
      person.addJoinGroup(member_id_add, _id_add, function (error, result) {
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

  })


})

router.post('/deleteMember',function (req, res) {
  // body...
  var _id_delete = req.body._id
  var member_id_delete  = req.body.member_id

  if (!_id_delete || !member_id_delete) {
    return res.json({result : false,
                     message : "fail,lost some params"})
  }
  //1.Check Member_id(Person) Is Exist
  person.checkExistById(member_id_delete, function (error, exist) {
    // body...
    if (error) {
      return res.send(error)
    }
    if (!exist) {
      return res.json({result : false,
                       message : "fail,person is not regist"})
    }

    //2.Delete person_id In Group
    group.deleteMember(_id_delete, member_id_delete, function (error, result) {
      // body...
      if (error) {
        return res.send(error)
      }
      if (result.result == false) {
        return res.json(result)
      }

      //3.Delete groupId In Person
      person.deleteJoinGroup(member_id_delete, _id_delete, function (error, result) {
        // body...
        if (error) {
          return res.send(error)
        }
        if (result.result == false) {
          return res.json(error)
        }
        res.json(result)

      })
    })
  })
})

router.get('/deleteById',function (req, res) {
  // body...
  var _id_delete = req.query._id

  if (!_id_delete) {
    return res.json({result : false,
                     message : "fail,lost some params"})
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
