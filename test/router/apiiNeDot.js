var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var inedot = require('../lib/inedot.js');
var center = require('../lib/center.js');
var person = require('../lib/person.js');
var group  = require('../lib/group.js');
var cpush  = require('../lib/cpush.js');

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
    inedot.checkExistById(inedot_id, function (error, exist) {
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

function createCPush(pushPeople, inedot_macAddr, inedot_id, callback) {
  // body...
  //1. Get All People
  person.findByIds(pushPeople, function (error, people) {
    // body...
    if (error) {
      console.log(error);
    }
    //2. Get All Center In Member
    var pushCenters = []
    console.log("PushPeople : "+people +" People.length : "+people.length);
    for (var i = 0; i < people.length; i++) {
      console.log("people["+i+"].centers : "+people[i].centers);
      var people_centers = people[i].centers

      //Get Center Push To pushCenters Array
      for (var j = 0; j < people_centers.length; j++) {
        pushCenters.push(people_centers[j])
      }
    }

    //3. Create CPush
    console.log("pushCenterS : "+pushCenters);
    for (var i = 0; i < pushCenters.length; i++) {
      cpush.create(pushCenters[i], inedot_macAddr, 0, function (error, result) {
        // body...
      })
      center.addDeviceList(pushCenters[i], inedot_id, function (error, result) {
        // body...
      })
    }

    callback(null,1)
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

  inedot.findById(_id_find,function (error,inedots) {
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
  var name_create           = req.body.name

  var connectState_create   = req.body.connectState
  var battery_create        = req.body.battery

  var type_create           = req.body.type
  // var nowSet_create         = req.body.nowSet
  // var center_create         = req.body.center

  var pushGroup_create      = req.body.pushGroup
  var pushPeople_create     = req.body.pushPeople

  var situation_create      = req.body.situation

  // console.log('macAddr_create: '+macAddr_create);
  // console.log('owner_create: '+owner_create);
  // console.log('connectState_create: '+connectState_create);
  // console.log('name_create: '+name_create);
  // console.log('battery_create: '+battery_create);
  // console.log('pushGroup_create: '+pushGroup_create.length);
  // console.log('situation_create: '+situation_create.mornitor.alert.value);

  if ( (macAddr_create == null) || (owner_create == null) || (connectState_create == null) ||
      (name_create == null) || (battery_create == null) || (type_create == null) ||
      (pushGroup_create == null) || (pushPeople_create == null) || (situation_create == null) )
      {
        return res.json({result : false,
                         message : "fail,lost some params"})
  }

  //1. Check Person Exist Or Not
  person.checkExistById(owner_create, function (error, exist) {
    // body...
    if (error) {
      return res.send(error)
    }
    if (!exist) {
      return res.json({result : false,
                       message : "fail,person is not regist"})
    }

    //**Route To @ Part, Normal Mode & Mornitor Mode
    //2. Create iNeDot

    inedot.create(macAddr_create, owner_create, connectState_create,
                  name_create,  battery_create, type_create, pushGroup_create,
                  pushPeople_create, situation_create,
          function (error, result) {
            // body...
            if (error) {
              return res.send(error)
            }
            if (result.result == false) {
              return res.json(result)
            }

            //Create CPush Table
            if (type_create == 1 /* iNeDot In Motnitor Mode */) {
              console.log("iNeDot Type : "+inedotType);
              createCPush(pushPeople_create, macAddr_create, inedot_id, function (error, result) {
                // body...
                console.log(result);
              })
            }

            //3. connect Person & iNeDot
            person.addiNedot(owner_create, inedot_id, function (error, result) {
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
//Update All
router.post('/updateAll',function (req, res) {
  // body...

  var inedot_id_update      = req.body._id
  var nowSe_update          = req.body.nowSet

  var connectState_update   = req.body.connectState
  var name_update           = req.body.name
  var battery_update        = req.body.battery
  var type_update           = req.body.type

  var center_update         = req.body.center
  var pushGroup_update      = req.body.pushGroup
  var pushPeople_update      = req.body.pushPeople
  var situation_update      = req.body.situation

  if (!inedot_id_update) {
    return res.json({result : false,
                     message : "fail,lost some params(_id)"})
  }

  inedot.updateAll(inedot_id_update, nowSe_update, connectState_update, name_update, battery_update,
                  type_update, center_update, pushGroup_update, pushPeople_update, situation_update,
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

//Update ConnectState
router.post('/updateConnectState',function (req, res) {
  // body...

  var inedot_id_update      = req.body._id
  var nowSet_update          = req.body.nowSet
  var connectState_update   = req.body.connectState

  if (!inedot_id_update || (connectState == null)) {
    return res.json({result : false,
                     message : "fail,lost some params(_id,connectState)"})
  }

  inedot.updateConnectState(inedot_id_update, nowSet_update, connectState_update,
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

//Update Name
router.post('/updateName',function (req, res) {
  // body...

  var inedot_id_update      = req.body._id
  var name_update           = req.body.name

  if (!inedot_id_update || !name_update) {
    return res.json({result : false,
                     message : "fail,lost some params(_id,name)"})
  }

  inedot.updateName(inedot_id_update, nowSet_update, name_update,
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

//Update Battery
router.post('/updateBattery',function (req, res) {
  // body...

  var inedot_id_update      = req.body._id
  var battery_update           = req.body.battery

  if (!inedot_id_update || !battery_update) {
    return res.json({result : false,
                     message : "fail,lost some params(_id,battery)"})
  }

  inedot.updateBattery(inedot_id_update, nowSet_update, battery_update,
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

//Update PushGroup
router.post('/updatePushGroup',function (req, res) {
  // body...

  var inedot_id_update      = req.body._id
  var nowSet_update         = req.body.noSet
  var pushGroup_update      = req.body.pushGroup
  var pushPeople_update     = req.body.pushPeople

  if (inedot_id_update==null || pushGroup_update==null || pushPeople_update==null) {
    return res.json({result : false,
                     message : "fail,lost some params(_id, pushGroup, pushPeople)"})
  }

  //1. Get Ole iNeDot First
  inedot.findById(inedot_id_update, function (error, inedot) {
    // body...
    //Create CPush
    var situation = inedot.situation
    res.json(""+situation)
    // console.log("UPData: situation: "+ situation[0]);

    //Save iNeDot Data
    inedot.updatePushGroup(inedot_id_update, nowSet_update, pushGroup_update, pushPeople_update,
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

})

//Update Situation
router.post('/updateSituation',function (req, res) {
  // body...

  var inedot_id_update      = req.body._id
  var nowSet_update         = req.body.nowSet
  var situation_update      = req.body.situation

  if (!inedot_id_update || !situation_update) {
    return res.json({result : false,
                     message : "fail,lost some params(_id,situation)"})
  }

  inedot.updateSituation(inedot_id_update, nowSet_update, situation_update,
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
      return res.json(result)
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
        res.json(result)
      })
    })
  })
})



module.exports = router;
