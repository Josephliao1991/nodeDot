var express = require('express');
var router  = express.Router();

var mongoose = require('mongoose');
var person = require('../lib/person.js');
var phone = require('../lib/phone.js');


function checkPersonPhoneExist(person_ssid, phone_uuid, callback) {
  // body...
  //1. Check Person Exist Or Not
  person.checkExistBySSID(person_ssid, function (error, exist) {
    // body...
    if (error) {
      return callback(error)
    }
    if (!exist) {
      return callback(null,{result : false,
                            message : "fail,person is regist"})
    }

    //2. Check Phone Exist Or Not
    phone.checkExistByUUID(phone_uuid, function (error, exist) {
      // body...
      if (error) {
        return callback(error)
      }
      if (!exist) {
        return callback(null,{result  : false,
                              message : "fail,phone is exist"})
      }

      callback(null,{reslut : true})

    })
  })

}

/*======================================================*/

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

router.get('/findBySSId',function (req, res) {
  // body...
  var _ssid_find = req.query.ssid

  if (!_ssid_find) {
    return res.json({result : false,
                     message : "fail,lost some params"})
  }

  person.findBySSID(_ssid_find,function (error,person) {
    // body...
    res.json(person)
  })
})


router.post('/regist',function (req, res) {
  // body...
  var ssid_regist = req.body.ssid
  var pwd_regist  = req.body.pwd
  var operation_regist   = req.body.operation
  var uuid_regist   = req.body.uuid
  var token_regist  = req.body.token

  if (!ssid_regist || !pwd_regist) {
    return res.json({result : false,
                     message : "fail,lost some params"})
  }
  // //1. Check Person & Phone Exist Or Not
  checkPersonPhoneExist(ssid_regist, uuid_regist, function (error, result) {
    // body...
    if (error) {
      return res.send(error)
    }
    if (result.result = false) {
      return res.json(result)
    }
    //2. Create Person
    person.create(ssid_regist, pwd_regist, function (error, result) {
      // body...
      if (error) {
        return res.send(error)
      }
      if (result.result == false) {
        console.log("false Test");
        return res.json(result)
      }

      var person_id = result.data._id
      console.log("person_id : "+person_id);
      //3. Create Phone
      phone.create(operation_regist, uuid_regist, token_regist, function (error, result) {
        // body...
        if (error) {
          return person.deleteById(person_id, function (error) {
                  // body...
                  //if fail ,delete person Account
                  res.send(error)
                  })
        }

        if (result.result == false) {
          //if fail ,delete person Account
          return person.deleteById(person_id, function (error) {
                  // body...
                  res.json(result)
                 })
        }

        var phone_id = result.data._id
        console.log("Phone_id : "+phone_id);
        //4. Connect Person & Phone` Refdb
          person.addPhone(person_id, phone_id, function (error, result) {
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
})

//Add delete Account Function In The feature

//Add more Phone In the Feature
// router.post('/addPhone',function (req, res) {
//
//
//
// }

module.exports = router
