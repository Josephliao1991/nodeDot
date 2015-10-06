var mongoose = require('mongoose');
var inedot = require('../lib/inedot.js');
var center = require('../lib/center.js');
var person = require('../lib/person.js');
var group  = require('../lib/group.js');
var cpush  = require('../lib/cpush.js');


/*======================================================*/
/*  C H E C K   */
/*======================================================*/
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
function createCPush(pushPeople, inedot_macAddr, inedot_id, command, callback) {
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
      cpush.create(pushCenters[i], inedot_macAddr, command, function (error, result) {
        // body...
      })
      if (command == 0) {
        center.addDeviceList(pushCenters[i], inedot_id, function (error, result) {
          // body...
        })
      }else if(command == 2) {
        center.deleteDeviceList(pushCenters[i], inedot_id, function (error, result) {
          // body...
        })

      }

    }

    callback(null,1)
  })

}

/*======================================================*/
/*  F I N D  */
/*======================================================*/
function findAll(callback) {
  // body...
  inedot.findAll(function (error,inedots) {
    // body...
    callback(null,inedots)
  })
}
function findById(_id, callback) {
  // body...
  if (!_id) {
    var result = {result : false,
                  message : "fail,lost some params"}
    return callback(null, result)
  }

  inedot.findById(_id_find,function (error,inedots) {
    // body...
    if (error) {
      return callback(error)
    }
    callback(null, inedots)
  })
}
function findByMacAddr(macAddr, callback) {
  // body...
  if (!macAddr) {
    var result = {result : false,
                  message : "fail,lost some params"}
    return callback(null, result)
  }

  inedot.findByMacAddr(macAddr_find, function (error,inedot) {
    // body...
    if (error) {
      callback(error)
    }
    callback(null, inedot)
  })
}

/*======================================================*/
/*  C R E A T E  */
/*======================================================*/
function create(macAddr, owner, name, connectState, battery, type, pushGroup, pushPeople, situation, callback) {
  // body...

  //1. Check Person Exist Or Not
  person.checkExistById(owner, function (error, exist) {
    // body...
    if (error) {
      return callback(error)
    }
    if (!exist) {
      var result = {result : false,
                    message : "fail,person is not regist"}
      return callback(null, result)
    }

    //**Route To @ Part, Normal Mode & Mornitor Mode
    //2. Create iNeDot
    inedot.create(macAddr, owner, connectState, name, battery, type,
                  pushGroup, pushPeople, situation,
          function (error, result) {
            // body...
            if (error) {
              return callback(error)
            }
            if (result.result == false) {
              return callback(result)
            }

            var inedot_id = result.data._id
            //Create CPush Table
            if (type == 1 /* iNeDot In Motnitor Mode */) {
              console.log("iNeDot Type : "+type);
              createCPush(pushPeople, macAddr, inedot_id, function (error, result) {
                // body...
                console.log(result);
              })
            }

            //3. connect Person & iNeDot
            person.addiNedot(owner, inedot_id, function (error, result) {
              // body...
              if (error) {
                return callback(error)
              }

              if (result.result == false) {
                return callback(null, result)
              }
              callback(result)
            })
          })
  })
}

/*======================================================*/
/*  U P D A T E  */
/*======================================================*/
//Update Data Next Step
//Update All
function updataAll(inedot_id, nowSet, connectState, name, battery, type,
                   center, pushGroup, pushPeople, situation, callback)
                   {
  // body...
  inedot.updateAll(inedot_id, nowSet, connectState, name, battery,
                  type, center, pushGroup, pushPeople, situation,
                 function (error, result) {
                   // body...
                   if (error) {
                     return callback(error)
                   }
                   if (result.result == false) {
                     return callback(null, result)
                   }
                   callback(null, result)
                 })
}
function updateConnectState(inedot_id, connectState, callback) {
  // body...
  inedot.updateConnectState(inedot_id, connectState,
                 function (error, result) {
                   // body...
                   if (error) {
                     return callback(error)
                   }
                   return callback(null, result)
                 })
}
function updateName(inedot_id, name, callback) {
  // body...
  inedot.updateName(inedot_id, name,
                 function (error, result) {
                   // body...
                   if (error) {
                     return callback(error)
                   }
                   return callback(null, result)
                 })
}
function updateBattery(inedot_id, battery, callback) {
  // body...
  inedot.updateBattery(inedot_id, battery,
                 function (error, result) {
                   // body...
                   if (error) {
                     return callback(error)
                   }
                  return callback(null, result)
                })
}
function updatePushGroup(inedot_id, pushGroup, pushPeople, callback) {
  // body...
  //1. Get Ole iNeDot First
  inedot.findById(inedot_id, function (error, inedot) {
    // body...

    //Create CPush
    //Handling Center Push & Type(normal:mornitor)
    var macAddr = inedot.macAddr
    createCPush(pushPeople, macAddr, inedot_id, 0, function (error, result) {
      // body...
      console.log(result);
    })

    //Save iNeDot Data
    inedot.updatePushGroup(inedot_id, pushGroup, pushPeople,
                   function (error, result) {
                     // body...
                     if (error) {
                       return callback(error)
                     }
                     callback(null, result)
                   })
  })
}
function updateSituation(inedot_id, nowSet, type, pushGroup, pushPeople, situation, callback) {
  // body...

  if (type == 0) {
    //Find Out iNeDot , Check Type(normal:mornitor)
    inedot.findById(inedot_id, function (error, inedot) {
      // body...
      inedot.updateSituation(inedot_id, nowSet, type, situation,
                     function (error, result) {
                       // body...
                       if (error) {
                         return callback(error)
                       }
                       callback(result)
                    })

      if (inedot.type == 1) {
        //Handling Center Push & Type(normal:mornitor)
        updatePushGroup(inedot_id, pushGroup, pushPeople, function (error, result) {
          // body...
         })
       }
     })

  }else {//type= 1
    inedot.findById(inedot_id, function (error, inedot) {
      // body...
      var command = 0
      if (inedot.type == 0) {
        command = 2
        //Handling Center Push & Type(normal:mornitor)
        updatePushGroup(inedot_id, [], [], function (error, result) {
          // body...
        })
      }

      inedot.updateSituation(inedot_id, nowSet, type, situation,
                     function (error, result) {
                       // body...
                       if (error) {
                         return callback(error)
                       }
                       callback(result)
                     })

      var macAddr = inedot.macAddr
      createCPush(pushPeople, macAddr, inedot_id, command, function (error, result) {
        // body...
        console.log(result);
      })


    })
  }
}

/*======================================================*/
/*  D E L E T E  */
/*======================================================*/
function deleteById(person_id, inedot_id, callback) {
  // body...
  // 1. check Person & iNeDot Exist  &(iNeDot Belongs To Person)
  checkPersoniNeDotExist(person_id, inedot_id, function (error, result) {
    // body...
    if (error) {
      return callback(error)
    }
    if (result.result == false) {
      return callback(null, result)
    }

    inedot.findById(inedot_id, function (error, inedot) {
      // body...
      var pushPeople  = inedot.pushPoeple
      var macAddr     = inedot.macAddr
      // 2. Delete iNeDot
      inedot.deleteById(inedot_id, function (error, result) {
        // body...
        if (error) {
          return callback(error)
        }
        if (result.result == false) {
          return callback(null, result)
        }
        // 3. Delete person
        person.deleteiNedot(person_id, inedot_id, function (error, result) {
          // body...
          if (error) {
            return callback(error)
          }
          if (result.result == false) {
            return callback(null, result)
          }
          // Handling CPush

          createCPush(pushPeople, macAddr, inedot_id, 2, function (error, result) {
            // body...
            console.log(result);
          })

          callback(null, result)
        })
      })
    })
  })
}


module.exports = {

  findAll         : findAll,
  findById        : findById,
  findByMacAddr   : findByMacAddr,

  create          : create,

  updataAll           : updataAll,
  updateConnectState  : updateConnectState,
  updateName          : updateName,
  updateBattery       : updateBattery,
  updatePushGroup     : updatePushGroup,
  updateSituation     : updateSituation,

  deleteById          : deleteById

}
