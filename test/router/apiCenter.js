var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var center = require('../lib/center.js');
var person = require('../lib/person.js');

//Wait For Fix
/*==><==*/

function checkPersonCenterExist(person_id, center_id, callback) {
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
    center.checkExistById(center_id, function (error, exist) {
      // body...
      if (error) {
        return callback(error)
      }
      if (!exist) {
        return callback(null,{result  : false,
                              message : "fail,center is not exist"})
      }

      callback(null,{reslut : true})

    })
  })

}

/*======================================================*/


router.get('/findAll',function (req, res) {
  // body...
  center.findAll(function (error,centers) {
    // body...
    res.json(centers)
  })
})

router.get('/findById',function (req, res) {
  // body...
  var _id_find = req.query._id

  if (!_id_find) {
    return res.json({result : false,
                     message : "fail,lost some params"})
  }

  center.findById(_id_find,function (error,centers) {
    // body...
    res.json(centers)
  })
})

router.get('/findByMacAddr',function (req, res) {
  // body...
  var macAddr_find = req.query.macAddr

  if (!macAddr_find) {
    return res.json({result : false,
                     message : "fail,lost some params"})
  }

  center.findByMacAddr(macAddr_find,function (error,center) {
    // body...
    res.json(center)
  })
})


router.post('/create',function (req, res) {
  // body...
  var macAddr_create        = req.body.macAddr
  var owner_create          = req.body.owner
  var connectState_create   = req.body.connectState
  var name_create           = req.body.name

  console.log('macAddr_create: '+macAddr_create);
  console.log('owner_create: '+owner_create);
  console.log('connectState_create: '+connectState_create);
  console.log('name_create: '+name_create);


  if (!macAddr_create || !owner_create || !connectState_create || !name_create) {
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
    //2. Create Center
    center.create(macAddr_create, owner_create, connectState_create, name_create,
          function (error, result) {
            // body...
            if (error) {
              return res.send(error)
            }
            if (result.result == false) {
              return res.json(result)
            }
            var center_id = result.data._id
            //3. connect Person & Center
            person.addCenter(owner_create, center_id, function (error, result) {
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
//Update Name
router.post('/updateName',function (req, res) {
  // body...

  var center_id_update      = req.body._id
  var name_update           = req.body.name

  if (!center_id_update || !name_update) {
    return res.json({result : false,
                     message : "fail,lost some params(_id, name)"})
  }

  console.log("Now Update Center Name : center_id : "+center_id_update);
  center.updateName(center_id_update, name_update,
                 function (error, result) {
                   console.log("Update Success");
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

  var center_id_update      = req.body._id
  var connectState_update   = req.body.connectState

  console.log("center_id_update : "+center_id_update +'\n'+"connectState_update : "+connectState_update);
  if (!center_id_update || (connectState_update == null)) {
    return res.json({result : false,
                     message : "fail,lost some params(_id,connectState)"})
  }

  inedot.updateConnectState(center_id_update, connectState_update,
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
  var center_id_delete    = req.body.center_id

  if (!person_id_delete || !center_id_delete) {
    return res.json({result : false,
                     message : "fail,lost some params"})
  }

  //1. check Person & iNeDot Exist
  checkPersonCenterExist(person_id_delete, center_id_delete, function (error, result) {
    // body...
    if (error) {
      return callback(error)
    }

    if (result.result == false) {
      return res.json(result)
    }

    //2. Delete Center
    center.deleteById(center_id_delete, function (error, result) {
      // body...
      if (error) {
        return res.send(error)
      }
      if (result.result == false) {
        return res.json(result)
      }

      //3. Delete center in person.centers
      person.deleteCenter(person_id_delete, center_id_delete, function (error, result) {
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
