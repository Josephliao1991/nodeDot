require('./dbModel');
var mongoose = require('mongoose');
var iNeDot  = mongoose.model('inedot')

/*======================================================*/
/*  C H E C K   */
/*======================================================*/
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

/*======================================================*/
/*  F I N D   */
/*======================================================*/

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
  iNeDot.findOne({macAddr  : macAddr}, function (error, inedot) {
    // body...
    if (error) {
      return callback(error)
    }
    callback(null,inedot)
  })

}
function findById(_id, callback) {
  // body...
  iNeDot.findOne({_id  : _id}, function (error, inedot) {
    // body...
    if (error) {
      return callback(error)
    }
    callback(null,inedot)
  })

}

/*======================================================*/
/*  C R E A T E  */
/*======================================================*/
function create(macAddr, owner, connectState, name, battery, type, pushGroup, pushPeople, situation, callback) {
  // body...
  var macAddr        = macAddr
  var owner          = owner

  var name           = name
  var connectState   = connectState
  var battery        = battery
  var type           = type
  // var nowSet         = nowSet
  // var center         = center
  var situation      = situation

  var pushGroup      = pushGroup
  var pushPeople     = pushPeople


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
      name           : name,

      connectState   : connectState,
      battery        : battery,
      type           : type,
      nowSet         : owner,
      // center         : center,
      situation      : situation,

      pushGroup      : pushGroup,
      pushPoeple     : pushPeople

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

/*======================================================*/
/*  U P D A T E    */
/*======================================================*/
function updateAll(_id, nowSet, connectState, name, battery, type, center, pushGroup, pushPoeple, situation, callback) {
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
    if (type)         {inedot.type = type}
    if (nowSet)       {inedot.nowSet = nowSet}
    if (center)       {inedot.center = center}
    if (pushGroup)    {inedot.pushGroup = pushGroup}
    if (pushPoeple)   {inedot.pushPoeple = pushPoeple}
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

    if ((connectState != null)) {inedot.connectState = connectState}

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

    if (name)   {inedot.name = name}

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

    if (battery)  {inedot.battery = battery}

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
function updatePushGroup(_id, pushGroup, pushPeople, callback) {
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

    console.log("pushGroup: "+pushGroup+"\n pushPeople: "+pushPeople)

    inedot.pushGroup  = pushGroup
    inedot.pushPoeple = pushPeople


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
function updateSituation(_id, nowSet, type, situation, callback) {
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
    if (nowSet) {inedot.nowSet = nowSet}

    if (type)       {inedot.type = type}
    if (nowSet)     {inedot.nowSet = nowSet}
    if (situation)  {inedot.situation = situation}

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

//Only For Center
function updateCenter(_id, center, callback) {
  // body...
  iNeDot.findById({_id : _id}, function (error, inedot) {
    // body...
    if (error) {
      return callback(error)
    }
    if (!inedot) {
      console.log('/device/inedot/updateCenter => fail,inedot is not exist \n inedot_id: '+_id);
      return callback(null,{result  : false,
                            message : "fail,inedot is not exist"})
    }

    if (center) {inedot.center = center}
    if (nowSet) {inedot.nowSet = nowSet}

    return inedot.save(function (error, inedot) {
      // body...
      if (error) {
        console.log('/device/inedot/updateCenter => fail to update \n inedot_id: '+_id);
        return callback(error)
      }
      console.log('/device/inedot/updateCenter => success, inedot is update \n inedot_id: '+_id+' Name: '+inedot.name);
      callback(null,{result : true,
                     data   : inedot})
    })
  })
}

/*======================================================*/
/*  D E L E T E  */
/*======================================================*/
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
