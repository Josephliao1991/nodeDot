var mongoose = require('mongoose');

//Create iNeDot Mongodb Module
var iNeDot = mongoose.model('inedot', {
    familyKey     : String,
    macAddr       : String,

    name          : String,
    situation     : String,

    owner         : String,
    connectState  : Boolean,

    battery       : Number,

    preset        : Array
});

function alliNeDot(request, response) {
  // body...
  iNeDot.find(function (error, inedots) {
    // body...
    if (error) {
      response.send(error)
    }else {
      response.json(inedots)
    }
  })
};

function familyiNeDot(request, response) {
  // body...
  var familyKey_find = request.query.familyKey
  var macAddr_find   = request.query.macAddr
  console.log('iNeDots Query With familyKey: '+ familyKey_find);
  console.log('iNeDots Query With macAddr: '+ macAddr_find);

  if (macAddr_find) {
     iNeDot.find({familyKey : familyKey_find,
                  macAddr   : macAddr_find},
      function(error, inedots) {
        // body...
        if (error) {
          response.send(error)
        }else {
          response.json(inedots)
        }
      })
  }else {
     iNeDot.find({familyKey : familyKey_find},
      function(error, inedots) {
        // body...
        if (error) {
          response.send(error)
        }else {
          response.json(inedots)
        }
      })
    }
};

function createiNeDot(request, response) {
  // body...
  var presetValue;
  if (request.body.situation == "temp" && request.body.temp) {
      presetValue = [{temp : request.body.temp}]
  }else if (request.body.situation == "alert" && request.body.alert) {
      presetValue = [{alert : request.body.alert}]
  }else if (request.body.situation == "message" && request.body.message) {
      presetValue = [{message : request.body.message}]
  }

  iNeDot.create({

      familyKey     : request.body.familyKey,
      macAddr       : request.body.macAddr,

      owner         : request.body.owner,
      connectState  : request.body.connectState,

      name          : request.body.name,
      situation     : request.body.situation,

      battery       : request.body.battery,

      preset        : presetValue
  },function(error, inedot){
    // body...
    if (error) {
        response.send(error)
    }else {
        // response.json(phone)
        response.json({result : "fail"})
    }
  })
}

function updateiNeDot(request, response) {
  // body...
  var familyKey_find = request.body.familyKey
  var macAddr_find   = request.body.macAddr

  console.log(familyKey_find);
  console.log(macAddr_find);

  iNeDot.findOne({familyKey : familyKey_find,
                macAddr  : macAddr_find },function(error, inedot) {
  // return iNeDot.findById(identifier,function(error, inedot) {
      // body...
      if (error) {
        response.end(error)
      }

      if (inedot) {
        // if (request.body.familyKey) {
        //     inedot.familyKey       = request.body.familyKey;
        //   }
        // if (request.body.macAddr) {
        //     inedot.macAddr         = request.body.macAddr;
        //   }
        if (request.body.situation) {
            inedot.situation       = request.body.situation;
          }
        if (request.body.connectState) {
            inedot.connectState    = request.body.connectState;
          }
        if (request.body.name) {
            inedot.name            = request.body.name;
          }
        if (request.body.battery) {
            inedot.battery         = request.body.battery;
          }
        if (request.body.owner) {
            inedot.owner           = request.body.owner;
          }
        if (request.body.situation == "temp" && request.body.temp) {
            inedot.preset     = [{temp : request.body.temp}];
        }else if (request.body.situation == "alert" && request.body.alert) {
            inedot.preset     = [{alert : request.body.alert}];
        }else if (request.body.situation == "message" && request.body.message) {
            inedot.preset     = [{message : request.body.message}];
        }

        // response.send(inedot)
        return inedot.save(function(error) {
          if (error) {
            response.send(error);
          }else {
            response.json({result : "fail"})              // return response.send(phone);
          }
        });
      }else {
        response.json({result : "no such device"})
      }
    })
}

function deleteiNeDot(request, response) {
  // body...
  var familyKey_find = request.body.familyKey
  var macAddr_find   = request.body.macAddr

  console.log(familyKey_find);
  console.log(macAddr_find);

  iNeDot.findOne({familyKey : familyKey_find,
                  macAddr   : macAddr_find },

  function(error, inedot) {

      // body...
      if (error) {
        response.end(error)
      }
      if (inedot) {
          // response.send(center)
          inedot.remove(function (error) {
            // body...
            if (error) {
              response.send(error)
            }else {
              response.json({result : "fail"})
            }
          })
      }else {
        response.json({result : "no such device"})
      }
    })
}

function deleteiNeDotById(request, response) {
  // body...
  var id_find  = request.body.identifier
  console.log(id_find);

  iNeDot.findOne({_id   : id_find},
    function(error, inedot) {
      // body...
      if (error) {
        response.end(error)
      }
      if (inedot) {
          // response.send(center)
          inedot.remove(function (error) {
            // body...
            if (error) {
              response.send(error)
            }else {
              response.json({result : "fail"})
            }
          })
      }else {
        response.json({result : "no such device"})
      }
    })
}

module.exports = {

  alliNeDot     : alliNeDot,
  familyiNeDot  : familyiNeDot,
  createiNeDot  : createiNeDot,
  updateiNeDot  : updateiNeDot,
  deleteiNeDot  : deleteiNeDot,
  deleteiNeDotById   : deleteiNeDotById,
  iNeDot        : iNeDot
}
