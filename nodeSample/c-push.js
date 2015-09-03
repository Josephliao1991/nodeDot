var mongoose = require('mongoose');

//Create Push Mongodb Module
/* Command Rule
command : Number
Baby  = 0
Area  = 1
Alert = 2
Temp  = 3
Break Connection  = 4
*/
var CPush = mongoose.model('c_push', {
    familyKey     : String,
    c_macAddr     : String,
    i_macAddr     : String,
    command       : Number,
    checkMark     : Boolean
});

function allCPush(request, response) {
  // body...
  CPush.find(function(error, c_pushs) {
    // body...
    if (error) {
      response.send(error)
    }else {
      response.json(c_pushs)
    }
  })
}

function familyCPush(request, response) {
  // body...
  var familyKey_find = request.query.familyKey
  var c_macAddr_find = request.query.c_macAddr
  console.log('c_push Query With familyKey: '+ familyKey_find);
  console.log('c_push Query With c_macAddr: '+ c_macAddr_find);

  if (c_macAddr_find) {

    CPush.find({familyKey : familyKey_find,
                c_macAddr : c_macAddr_find,
                checkMark : false},

      function(error, c_push) {
        // body...
        if (error) {
          response.send(error)
        }else {
          response.json(c_push)
        }
      })
  }else {
    CPush.find({familyKey : familyKey_find,
                checkMark : false},

      function(error, c_push) {
        // body...
        if (error) {
          response.send(error)
        }else {
          response.json(c_push)
        }
      })
  }
}

function createCPush(request, response) {
  // body...
  CPush.create({

      familyKey     : request.body.familyKey,
      c_macAddr     : request.body.c_macAddr,
      i_macAddr     : request.body.i_macAddr,
      command       : request.body.command,
      checkMark     : false

  },function(error, c_push){
    // body...
    if (error) {
        response.send(error)
    }else {
        // response.json(phone)
        response.send("success")
    }
  })
}

function updateCPush(request, response) {
  // body...
  // var familyKey_find  = request.body.familyKey
  // var c_macAddr_find  = request.body.c_macAddr
  // var i_macAddr_find  = request.body.i_macAddr
  var identifier_find = request.body.identifier;

  // console.log(familyKey_find);
  // console.log(c_macAddr_find);
  // console.log(i_macAddr_find);
  console.log(identifier_find);

  CPush.findById({_id : identifier_find},

  function(error, c_push) {
      // body...
      if (error) {
        response.end(error)
      }
      if (c_push) {
        // if (request.body.familyKey) {
        //     push.familyKey       = request.body.familyKey;
        //   }
        // if (request.body.c_macAddr) {
        //     push.c_macAddr       = request.body.c_macAddr;
        //   }

        c_push.checkMark = true

        // response.send(center)
        return c_push.save(function(error) {
          if (error) {
            response.send(error);
          }else {
            response.send("success")              // return response.send(phone);
          }
        });
      }else {
        response.send("no such CPush")
      }
    })
}

function changeCPushCheckMark(request, response) {
  // body...
  var identifier_find = request.body.identifier;
  var checkMark       = request.body.checkMark;

  console.log(identifier_find);
  console.log(checkMark);

  CPush.findById({ _id : identifier_find},
    function(error, c_push) {
      // body...
      if (error) {
        response.end(error)
      }
      if (c_push) {
        // if (request.body.familyKey) {
        //     push.familyKey       = request.body.familyKey;
        //   }
        // if (request.body.c_macAddr) {
        //     push.c_macAddr       = request.body.c_macAddr;
        //   }
        if (checkMark) {
          c_push.checkMark = checkMark
        }

        return c_push.save(function(error) {
          if (error) {
            response.send(error);
          }else {
            response.send("success")              // return response.send(phone);
          }
        });
      }else {
        response.send("no such CPush")
      }
    })
}

function deleteCPush(request, response) {
  // body...
  // var familyKey_find  = request.body.familyKey
  // var c_macAddr_find  = request.body.c_macAddr
  // var i_macAddr_find  = request.body.i_macAddr
  var id_find  = request.body.identifier

  // console.log(familyKey_find);
  // console.log(c_macAddr_find);
  // console.log(i_macAddr_find);
  console.log(id_find);

  CPush.findOne({_id  : id_find},
    function(error, c_push) {
      // body...
      if (error) {
        response.end(error)
      }

      if (c_push) {
          // response.send(center)
          c_push.remove(function (error) {
            // body...
            if (error) {
              response.send(error)
            }else {
              response.send("success")
            }
          })
      }else {
        // response.send("no such CPush")
        response.send("fail")
      }
    })
}

module.exports = {
  allCPush    : allCPush,
  familyCPush : familyCPush,
  createCPush : createCPush,
  updateCPush : updateCPush,
  changeCPushCheckMark  : changeCPushCheckMark,
  deleteCPush : deleteCPush,

  CPush : CPush

}
