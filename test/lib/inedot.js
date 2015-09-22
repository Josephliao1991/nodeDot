require('./dbModel');
var mongoose = require('mongoose');
var iNeDot  = mongoose.model('inedot')


function checkExistByMacAddr(macAddr, callback) {
  // body...
  iNeDot.find({macAddr  : macAddr}, function (error, inedot) {
    // body...
    if (error) {
      return callback(error)
    }
    if (inedot.length > 0) {
      return callback(null,1)
    }
    callback(null,null)
  })
}

function checkExistById(_id, callback) {
  // body...
  iNeDot.find({_id  : _id}, function (error, inedot) {
    // body...
    if (error) {
      return callback(error)
    }
    if (inedot.length > 0) {
      return callback(null,1)
    }
    callback(null,null)
  })
}

/*==================================================*/

function findAll(callback) {
  // body...
  iNeDot.find(function (error, inedots) {
    // body...
    if (error) {
      return callback(error)
    }
    callback(null, inedots)
  })
}

function findByMacAddr(macAddr, callback) {
  // body...
  iNeDot.find({macAddr  : macAddr}, function (error, inedot) {
    // body...
    if (error) {
      return callback(error)
    }
    callback(null,null)
  })

}

function findById(_id, callback) {
  // body...
  iNeDot.find({_id  : _id}, function (error, inedot) {
    // body...
    if (error) {
      return callback(error)
    }
    callback(null,null)
  })

}

function create(macAddr, owner, connectState, name, battery, pushGroup, situation, callback) {
  // body...
  var macAddr        = macAddr
  var owner          = owner
  var connectState   = connectState
  var name           = name
  var battery        = battery
  var pushGroup      = pushGroup
  var situation      = situation
  var type = situation.type
  var mornitor = situation.mornitor
  var alert    = mornitor.alert
  var temp     = mornitor.temp
  var humi     = mornitor.humi
  var baby     = mornitor.bady
  var area     = mornitor.area
  var mesg     = mornitor.mesg

  var normal   = situation.normal
  var sport    = normal.sport
  var pet      = normal.pet
  var find     = normal.find
  var drop     = normal.drop

  //1. Check iNeDot Exist Or Not
  checkExistByMacAddr(macAddr, function (error, exist) {
    // body...
    if (error) {
      return callback(error)
    }
    if (exist) {
      console.log('/device/inedot/create => fail,inedot is exist \n macAddr: '+macAddr+' Name: '+name);
      return callback(null,{result  : false,
                            message : "fail,inedot is exist"})
    }
    //2. Create iNeDot
    iNeDot.create({
      macAddr        : macAddr,
      owner          : owner,
      connectState   : connectState,
      name           : name,
      battery        : battery,
      pushGroup      : pushGroup,
      pushPoeple     : [],
      situation      : {type     :  type,// 0 => mornitor , 1 => normal
                        mornitor : {alert : {enable : alert.enable, value : alert.value},
                                    temp  : {enable : temp.enable,  value : temp.value},
                                    humi  : {enable : humi.enable,  value : humi.value},
                                    baby  : {enable : baby.enable},
                                    area  : {enable : area.enable},
                                    mesg  : {enable : mesg.enable,  value : mesg.value}
                                  },
                        normal   : {sport : {enable : sport.enable},
                                    pet   : {enable : pet.enable},
                                    find  : {enable : find.enable},
                                    drop  : {enable : drop.enable}
                                  }
                        }

    },function (error, inedot) {
      // body...
      if (error) {
        console.log('/device/inedot/create => fail to create inedot \n macAddr: '+macAddr+' Name: '+name);
        return callback(error)
      }
      console.log('/device/inedot/create => success,inedot is createNow \n macAddr: '+macAddr+' Name: '+name);
      callback(null, {result  : true,
                      data    : inedot});

    })
  })

}


//Update Data Next Step
//Update All
function updateAll(_id, connectState, name, battery, pushGroup, situation, callback) {
  // body...
  iNeDot.findById({_id : _id}, function (error, inedot) {
    // body...
    if (error) {
      return callback(error)
    }
    if (!inedot) {
      console.log('/device/inedot/updateAll => fail,inedot is not exist \n inedot_id: '+_id);
      return callback(null,{result  : false,
                            message : "fail,inedot is not exist"})
    }

    if (connectState) {inedot.connectState = connectState}
    if (name)         {inedot.name= name}
    if (battery)      {inedot.battery = battery}
    if (pushGroup)    {inedot.pushGroup = pushGroup}
    if (situation)    {inedot.situation = situation}

    return inedot.save(function (error, inedot) {
      // body...
      if (error) {
        console.log('/device/inedot/updateAll => fail to update \n inedot_id: '+_id);
        return callback(error)
      }
      console.log('/device/inedot/updateAll => success, inedot is update \n inedot_id: '+_id+' Name: '+inedot.name);
      callback(null,{result : true,
                     data   : inedot})
    })
  })
}

//Update ConnectState
function updateConnectState(_id, connectState, callback) {
  // body...
  iNeDot.findById({_id : _id}, function (error, inedot) {
    // body...
    if (error) {
      return callback(error)
    }
    if (!inedot) {
      console.log('/device/inedot/updateConnectState => fail,inedot is not exist \n inedot_id: '+_id);
      return callback(null,{result  : false,
                            message : "fail,inedot is not exist"})
    }

    if (connectState) {inedot.connectState = connectState}

    return inedot.save(function (error, inedot) {
      // body...
      if (error) {
        console.log('/device/inedot/updateConnectState => fail to update \n inedot_id: '+_id);
        return callback(error)
      }
      console.log('/device/inedot/updateConnectState => success, inedot is update \n inedot_id: '+_id+' Name: '+inedot.name);
      callback(null,{result : true,
                     data   : inedot})
    })
  })
}

//Update Name
function updateName(_id, name, callback) {
  // body...
  iNeDot.findById({_id : _id}, function (error, inedot) {
    // body...
    if (error) {
      return callback(error)
    }
    if (!inedot) {
      console.log('/device/inedot/updateName => fail,inedot is not exist \n inedot_id: '+_id);
      return callback(null,{result  : false,
                            message : "fail,inedot is not exist"})
    }

    if (name) {inedot.name = name}

    return inedot.save(function (error, inedot) {
      // body...
      if (error) {
        console.log('/device/inedot/updateName => fail to update \n inedot_id: '+_id);
        return callback(error)
      }
      console.log('/device/inedot/updateName => success, inedot is update \n inedot_id: '+_id+' Name: '+inedot.name);
      callback(null,{result : true,
                     data   : inedot})
    })
  })
}

//Update Battery
function updateBattery(_id, battery, callback) {
  // body...
  iNeDot.findById({_id : _id}, function (error, inedot) {
    // body...
    if (error) {
      return callback(error)
    }
    if (!inedot) {
      console.log('/device/inedot/updateBattery => fail,inedot is not exist \n inedot_id: '+_id);
      return callback(null,{result  : false,
                            message : "fail,inedot is not exist"})
    }

    if (battery) {inedot.battery = battery}

    return inedot.save(function (error, inedot) {
      // body...
      if (error) {
        console.log('/device/inedot/updateBattery => fail to update \n inedot_id: '+_id);
        return callback(error)
      }
      console.log('/device/inedot/updateBattery => success, inedot is update \n inedot_id: '+_id+' Name: '+inedot.name);
      callback(null,{result : true,
                     data   : inedot})
    })
  })
}

//Update PushGroup
function updatePushGroup(_id, pushGroup, callback) {
  // body...
  iNeDot.findById({_id : _id}, function (error, inedot) {
    // body...
    if (error) {
      return callback(error)
    }
    if (!inedot) {
      console.log('/device/inedot/updatePushGroup => fail,inedot is not exist \n inedot_id: '+_id);
      return callback(null,{result  : false,
                            message : "fail,inedot is not exist"})
    }

    if (pushGroup) {inedot.pushGroup = pushGroup}

    return inedot.save(function (error, inedot) {
      // body...
      if (error) {
        console.log('/device/inedot/updatePushGroup => fail to update \n inedot_id: '+_id);
        return callback(error)
      }
      console.log('/device/inedot/updatePushGroup => success, inedot is update \n inedot_id: '+_id+' Name: '+inedot.name);
      callback(null,{result : true,
                     data   : inedot})
    })
  })
}

//Update Situation
function updateSituation(_id, situation, callback) {
  // body...
  iNeDot.findById({_id : _id}, function (error, inedot) {
    // body...
    if (error) {
      return callback(error)
    }
    if (!inedot) {
      console.log('/device/inedot/updateSituation => fail,inedot is not exist \n inedot_id: '+_id);
      return callback(null,{result  : false,
                            message : "fail,inedot is not exist"})
    }

    if (situation) {inedot.situation = situation}

    return inedot.save(function (error, inedot) {
      // body...
      if (error) {
        console.log('/device/inedot/updateSituation => fail to update \n inedot_id: '+_id);
        return callback(error)
      }
      console.log('/device/inedot/updateSituation => success, inedot is update \n inedot_id: '+_id+' Name: '+inedot.name);
      callback(null,{result : true,
                     data   : inedot})
    })
  })
}


function deleteById(_id, callback) {
  // body...
  iNeDot.findOne({_id : _id},function (error, inedot) {
    // body...
    if (error) {
      callback(error)
    }
    if (!inedot) {
      console.log('/device/inedot/deleteById => fail,inedot is not exist');
      return callback(null,{result  : false,
                            message : "fail,inedot is not exist"})
    }

    inedot.remove(function (error) {
      // body...
      if (error) {
        console.log('/device/inedot/deleteById => fail, can not delete \n inedot_id: '+_id);
        return callback(error)
      }
      console.log('/device/inedot/deleteById => success, inedot is delete \n inedot_id: '+_id);
      callback(null,{result  : true,
                     message : 'success, inedot is delete'})

    })
  })
}


module.exports = {

  checkExistByMacAddr : checkExistByMacAddr,
  checkExistById      : checkExistById,

  findAll             : findAll,
  findByMacAddr       : findByMacAddr,
  findById            : findById,

  create              : create,

  updateAll           : updateAll,
  updateConnectState  : updateConnectState,
  updateName          : updateName,
  updateBattery       : updateBattery,
  updatePushGroup     : updatePushGroup,
  updateSituation     : updateSituation,

  deleteById          : deleteById


}
