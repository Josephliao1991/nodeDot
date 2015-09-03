var mongoose = require('mongoose');

//Create Center Mongodb Module
var Center = mongoose.model('center', {
    familyKey     : String,
    macAddr       : String,

    connectState  : Boolean,
});

function allCenter(request, response) {
  // body...
  Center.find(function(error, centers) {
    // body...
    if (error) {
      response.send(error)
    }else {
      response.json(centers)
    }
  })
}

function familyCenter(request, response) {
  // body...
  var familyKey_find = request.query.familyKey
  var macAddr_find   = request.query.macAddr
  console.log('Center Query With familyKey: '+ familyKey_find);
  console.log('Center Query With macAddr: '+ macAddr_find);

  if (macAddr_find) {

    Center.find({familyKey : familyKey_find,
                macAddr   : macAddr_find},

      function(error, center) {
        // body...
        if (error) {
          response.send(error)
        }else {
          response.json(center)
        }
      })
  }else {

    Center.find({familyKey : familyKey_find},
      function(error, centers) {
        // body...
        if (error) {
          response.send(error)
        }else {
          response.json(centers)
        }
      })
    }
}

function getCenterFamilyKey(request, response) {
  // body...
  var macAddr_find = request.query.macAddr
  console.log("getFamilyKey Query : " + macAddr_find);
  if (macAddr_find) {
      Center.findOne({macAddr : macAddr_find},
        function(error, center) {
          // body...
          if (error) {
            response.send(error)
          }
          // console.log(center);
          if (center) {
            var familyKey = center.familyKey
            console.log(center.familyKey);
            response.send('[{"' + familyKey + '"}]')
          }else {
            response.end("Belong with no family")
          }
        })
  }
}

function createCenter(request, response) {
  // body...
  Center.create({
      familyKey     : request.body.familyKey,
      macAddr       : request.body.macAddr,

      connectState  : request.body.connectState,},
  function(error, center){
    // body...
    if (error) {
        response.send(error)
    }else {
        // response.json(phone)
        response.send("success")
    }
  })
}

function updateCenter(request, response) {
  // body...
  var familyKey_find = request.body.familyKey
  var macAddr_find   = request.body.macAddr

  console.log(familyKey_find);
  console.log(macAddr_find);

  Center.findOne({familyKey : familyKey_find,
                  macAddr  : macAddr_find },

  function(error, center) {
      // body...
      if (error) {
        response.end(error)
      }
      if (center) {
        // if (request.body.familyKey) {
        //     center.familyKey       = request.body.familyKey;
        //   }
        // if (request.body.macAddr) {
        //     center.macAddr         = request.body.macAddr;
        //   }

        if (request.body.connectState) {
            center.connectState    = request.body.connectState;
          }
        // response.send(center)
        return center.save(function(error) {
          if (error) {
            response.send(error);
          }else {
            response.send("success")              // return response.send(phone);
          }
        });
      }else {
        response.send("no such device")
      }

    })
}

function deleteCenter(request, response) {
  // body...
  var familyKey_find = request.body.familyKey
  var macAddr_find   = request.body.macAddr

  console.log(familyKey_find);
  console.log(macAddr_find);

  Center.findOne({familyKey : familyKey_find,
                  macAddr   : macAddr_find },

  function(error, center) {
      // body...
      if (error) {
        response.end(error)
      }

      if (center) {
          // response.send(center)
          center.remove(function (error) {
            // body...
            if (error) {
              response.send(error)
            }else {
              response.send("success")
            }
          })
      }else {
        response.send("no such device")
      }
    })
}

function deleteCenterById(request, response) {
  // body...
  var id_find   = request.body.identifier
  console.log(id_find);

  Center.findOne({_id  : id_find },
  function(error, center) {
      // body...
      if (error) {
        response.end(error)
      }
      if (center) {
          // response.send(center)
          center.remove(function (error) {
            // body...
            if (error) {
              response.send(error)
            }else {
              response.send("success")
            }
          })
      }else {
        response.send("no such device")
      }
    })
}

module.exports = {
  allCenter     : allCenter,
  familyCenter  : familyCenter,
  getCenterFamilyKey    : getCenterFamilyKey,
  createCenter  : createCenter,
  updateCenter  : updateCenter,
  deleteCenter  : deleteCenter,
  deleteCenterById  : deleteCenterById,

  Center  : Center

}
