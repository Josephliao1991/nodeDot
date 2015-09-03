var mongoose = require('mongoose');
var QRHandler = require('./QRHandler.js');

var Phone = mongoose.model('phone', {
    familyKey   : String,
    deviceToken : String,//iOS : deviceToken  & Android : registerID
    token       : String,
    operation   : String,
    badgeNumber : Number
});

function checkFamilyExist(familyKey,callback) {
  // body...
  Phone.find({familyKey:familyKey},function(error, phones) {
    // body...
    if (error) {
      return error
    }

    console.log(phones);
    if (phones.length > 0) {
      return callback(null,"true")
    }else {
      return callback(null,"false")
    }
  })
}


function allPhone(resquest, resopnse) {
  // body...

  Phone.find(function(error, phones) {
    // body...
    if (error) {
      resopnse.send(error)
    }else {
      resopnse.json(phones)
    }
  })
}

function familyPhone(request, response) {
  // body...
  var familyKey_find = request.query.familyKey
  console.log('familyKey:'+ familyKey_find);

  Phone.find({familyKey:familyKey_find},function(error, phones) {
      // body...
      if (error) {
        response.send(error)
      }
      if (phones) {
        response.json(phones)
      }
    })
}

function getQRPhone(request, response) {
  // body...
  var name = request.query.familyKey
  // console.log(name);

  if (name) {
    checkFamilyExist(name,function (error,exist) {
      // body...
      console.log(exist);
      if (exist == "true") {
        console.log("exist");
        QRHandler.readqr(name+".png").pipe(response)

      }else {
        console.log("dosen't exist");
        response.json({result : "fail"})
      }
    })
  }else {
    response.json({result : "fail"})
  }

}

function createPhone(request, response) {
  // body...
  var familyKey_create    = request.body.familyKey
  var deviceToken_create  = request.body.deviceToken
  var token_create        = request.body.token
  var operation_create    = request.body.operation


  if (familyKey_create == deviceToken_create) {

    checkFamilyExist(familyKey_create,function (error, exist) {
      // body...
      if (exist == "true") {
        response.end("fail,allready create family")
      }else {
        QRHandler.createqr(familyKey_create)
        Phone.create({
            familyKey   : familyKey_create,
            deviceToken : deviceToken_create,
            token       : token_create,
            operation   : operation_create,
            badgeNumber : 0
        },function(error, phone){
          // body...
          if (error) {
            resopnse.send(error)
          }else {
            response.json({result : "success"})
          }
        })
      }
    })

  }else {
    Phone.create({
        familyKey   : familyKey_create,
        deviceToken : deviceToken_create,
        token       : token_create,
        operation   : operation_create,
        badgeNumber : 0
    },function(error, phone){
      // body...
      if (error) {
        resopnse.send(error)
      }else {
        response.json({result : "success"})
      }
    })
  }

}

function updatePhone(request, response) {
  // body...
  var familyKey_find = request.body.familyKey
  var deviceToken_find   = request.body.deviceToken

  console.log(familyKey_find);
  console.log(deviceToken_find);

  Phone.findOne({familyKey     : familyKey_find,
                 deviceToken   : deviceToken_find },
  function(error, phone) {
    if (error) {
      response.send(error)
    }
    if (phone) {

      if (request.body.operation) {
        phone.operation    = request.body.operation;
      }
      if (request.body.token) {
        phone.token        = request.body.token;
      }
      if (request.body.badgeNumber) {
        phone.badgeNumber  = request.body.badgeNumber;
      }

      phone.save(function(error) {
        if (error) {
          response.send(error)
         }else {
          response.json({result : "success"})
         }
      });

    }else {
      response.json({result : "no such device"})
    }

  });
}

function deletePhone(request, response) {
  // body...
  var familyKey_find    = request.body.familyKey
  var deviceToken_find  = request.body.deviceToken

  console.log(familyKey_find);
  console.log(deviceToken_find);

  Phone.findOne({familyKey     : familyKey_find,
                 deviceToken   : deviceToken_find },
  function(error, phone) {
      // body...
      if (error) {
        response.send(error)
      }
      if (phone) {
        // console.log("wait for delete : " + phone);
        phone.remove(function (error) {
          // body...
          if (error) {
            response.send(error)
          }else {
            // console.log("Delete success");
            response.json({result : "success"})
          }
        })
      }else {
        response.json({result : "no such device"})
      }
  })
}

function deletePhoneById(request, response) {
  // body...
  var id_find  = request.body.identifier
  console.log(id_find);

  Phone.findOne({_id   : id_find},
  function(error, phone) {
      // body...
      if (error) {
        response.send(error)
      }
      if (phone) {
        // console.log("wait for delete : " + phone);
        phone.remove(function (error) {
          // body...
          if (error) {
            response.send(error)
          }else {
            // console.log("Delete success");
            rresponse.json({result : "success"})
          }
        })
      }else {
        response.json({result : "no such device"})
      }
  })
}

/*=====================================================*/
function getFamilyMember(familyKey_find) {
  // body...
  Phone.find({familyKey  : familyKey_find},
    function (error,phones) {
      // body...
      // console.log(phones.length);
      // console.log(phones[0].familyKey);
      // var members = []
      // members = phones
      // for (var i = 0; i < phones.length; i++) {
      //   console.log(phones[i].deviceToken)
      // }

      return phones[0].deviceToken;

    }
  )

}

module.exports = {

  allPhone     : allPhone,
  familyPhone  : familyPhone,
  getQRPhone   : getQRPhone,
  createPhone  : createPhone,
  updatePhone  : updatePhone,
  deletePhone  : deletePhone,
  deletePhoneById   : deletePhoneById,

  // getFamilyMember  : getFamilyMember,

  Phone   : Phone

}
