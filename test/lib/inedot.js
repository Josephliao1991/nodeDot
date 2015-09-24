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
    callback(null,inedot)
  })

}

function findById(_id, callback) {
  // body...
  iNeDot.find({_id  : _id}, function (error, inedot) {
    // body...
    if (error) {
      return callback(error)
    }
    callback(null,inedot)
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
  var center   = situation.center
  var mornitor = situation.mornitor
  var alert    = mornitor.alert
  var temp     = mornitor.temp
  var humi     = mornitor.humi
  var baby     = mornitor.baby
  var area     = mornitor.area
  var mesg     = mornitor.mesg

  var alert_e    = alert.enable
  var temp_e     = temp.enable
  var humi_e     = humi.enable
  var baby_e     = baby.enable
  var area_e     = area.enable
  var mesg_e     = mesg.enable

  var alert_v    = alert.value
  var temp_v     = temp.value
  var humi_v     = humi.value
  var mesg_v     = mesg.value


  // console.log('type: '+type);
  // console.log('mornitor: '+mornitor);
  // console.log('alert: '+alert.enable);
  // console.log('temp: '+temp.enable);
  // console.log('humi: '+humi.enable);
  // console.log('baby: '+baby.enable);
  // console.log('area: '+area.enable);
  // console.log('mesg: '+mesg.enable);


  var normal   = situation.normal
  var sport    = normal.sport
  var pet      = normal.pet
  var find     = normal.find
  var drop     = normal.drop

  var sport_e    = sport.enable
  var pet_e      = pet.enable
  var find_e     = find.enable
  var drop_e     = drop.enable

  // console.log('normal: '+normal);
  // console.log('sport: '+sport.enable);
  // console.log('pet: '+pet.enable);
  // console.log('find: '+find.enable);
  // console.log('drop: '+drop.enable);


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
      situation      : [{
                        type     :  type,// 0 => mornitor , 1 => normal
                        center   :  center,//center_id
                        mornitor : {alert : {enable : alert_e, value : alert_v},
                                    temp  : {enable : temp_e,  value : temp_v},
                                    humi  : {enable : humi_e,  value : humi_v},
                                    baby  : {enable : baby_e},
                                    area  : {enable : area_e},
                                    mesg  : {enable : mesg_e,  value : mesg_v}
                                  },
                        normal   : {sport : {enable : sport_e},
                                    pet   : {enable : pet_e},
                                    find  : {enable : find_e},
                                    drop  : {enable : drop_e}
                                  }
                        }]

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
