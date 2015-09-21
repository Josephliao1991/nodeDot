var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var inedot = require('../lib/inedot.js');
var person = require('../lib/person.js');


function checkPersoniNeDotExist(person_id, inedot_id, callback) {
  // body...
  //1. Check Person Exist Or Not
  person.checkExistById(person_id, function (error, exist) {
    // body...
    if (error) {
      return callback(error)
    }
    if (!exist) {
      return callback(null,{result : false,
                            message : "fail,person is not regist"})
    }

    //2. Check inedot Exist Or Not
    ineodt.checkExistById(inedot_id, function (error, exist) {
      // body...
      if (error) {
        return callback(error)
      }
      if (!exist) {
        return callback(null,{result  : false,
                              message : "fail,inedot is not exist"})
      }

      callback(null,{reslut : true})

    })
  })

}

/*======================================================*/


router.get('/findAll',function (req, res) {
  // body...
  inedot.findAll(function (error,inedots) {
    // body...
    res.json(inedots)
  })
})

router.get('/findById',function (req, res) {
  // body...
  var _id_find = req.query._id

  if (!_id_find) {
    return res.json({result : false,
                     message : "fail,lost some params"})
  }

  person.findById(_id_find,function (error,inedots) {
    // body...
    res.json(inedots)
  })
})

router.get('/findByMacAddr',function (req, res) {
  // body...
  var macAddr_find = req.query.macAddr

  if (!macAddr_find) {
    return res.json({result : false,
                     message : "fail,lost some params"})
  }

  inedot.findByMacAddr(macAddr_find,function (error,inedot) {
    // body...
    res.json(inedot)
  })
})



router.post('/create',function (req, res) {
  // body...
  var macAddr_create        = req.body.macAddr
  var owner_create          = req.body.owner
  var connectState_create   = req.body.connectState
  var name_create           = req.body.name
  var battery_create        = req.body.battery
  var pushGroup_create      = req.body.pushGroup
  var situation_create      = req.body.situation

  var person_id             = req.body.person_id

  if (!macAddr_create || !owner_create || !connectState_create ||
      !name_create || !battery_create /*|| !pushGroup_create ||
      !situation_create*/ || !person_id) {
        return res.json({result : false,
                         message : "fail,lost some params"})
  }

  //1. Check Person Exist Or Not
  person.checkExistById(person_id, function (error, exist) {
    // body...
    if (error) {
      return res.send(error)
    }
    if (!exist) {
      return res.json({result : false,
                       message : "fail,person is not regist"})
    }
    //2. Create iNeDot
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
            var inedot_id = result.data._id
            //3. connect Person & iNeDot
            person.addiNedot(person_id, inedot_id, function (error, result) {
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

//Update Data Next Step


router.post('/delete',function (req, res) {
  // body...
  var person_id_delete    = req.body.person_id
  var inedot_id_delete    = req.body.inedot_id

  if (!person_id_delete || !inedot_id_delete) {
    return res.json({result : false,
                     message : "fail,lost some params"})
  }

  //1. check Person & iNeDot Exist
  checkPersoniNeDotExist(person_id_delete, inedot_id_delete, function (error, result) {
    // body...
    if (error) {
      return callback(error)
    }

    if (result.result == false) {
      res.json(result)
    }

    //2. Delete iNeDot
    inedot.deleteById(inedot_id_delete, function (error, result) {
      // body...
      if (error) {
        return res.send(error)
      }
      if (result.result == false) {
        return res.json(result)
      }

      //3. Delete person
      person.deleteiNedot(person_id_delete, inedot_id_delete, function (error, result) {
        // body...
        if (error) {
          return res.send(error)
        }
        if (result.result == false) {
          return res.json(result)
        }
      })
    })
  })
})



module.exports = router;