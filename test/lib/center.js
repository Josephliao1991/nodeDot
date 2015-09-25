require('./dbModel');
var mongoose = require('mongoose');
var Center  = mongoose.model('center')


function checkExistByMacAddr(macAddr, callback) {
  // body...
  Center.find({macAddr  : macAddr}, function (error, center) {
    // body...
    if (error) {
      return callback(error)
    }
    if (center.length > 0) {
      return callback(null,1)
    }
    callback(null,null)
  })
}

function checkExistById(_id, callback) {
  // body...
  Center.find({_id  : _id}, function (error, center) {
    // body...
    if (error) {
      return callback(error)
    }
    if (center.length > 0) {
      return callback(null,1)
    }
    callback(null,null)
  })
}

/*==================================================*/

function findAll(callback) {
  // body...
  Center.find(function (error, centers) {
    // body...
    if (error) {
      return callback(error)
    }
    callback(null, centers)
  })
}

function findByMacAddr(macAddr, callback) {
  // body...
  Center.find({macAddr  : macAddr}, function (error, center) {
    // body...
    if (error) {
      return callback(error)
    }
    callback(null,center)
  })

}

function findById(_id, callback) {
  // body...
  Center.find({_id  : _id}, function (error, center) {
    // body...
    if (error) {
      return callback(error)
    }
    callback(null,center)
  })

}

function create(macAddr, owner, connectState, name, callback) {
  // body...

  //1. Check Center Exist Or Not
  checkExistByMacAddr(macAddr, function (error, exist) {
    // body...
    if (error) {
      return callback(error)
    }
    if (exist) {
      console.log('/device/center/create => fail,center is exist \n macAddr: '+macAddr+' Name: '+name);
      return callback(null,{result  : false,
                            message : "fail,center is exist"})
    }
    //2. Create Center
    Center.create({
      macAddr : macAddr,
      owner   : owner,
      name    : name,

      connectState  : connectState,

      deviceList    : [],
      connectingDevice  : []

    },function (error, center) {
      // body...
      if (error) {
        console.log('/device/center/create => fail to create center \n macAddr: '+macAddr+' Name: '+name);
        return callback(error)
      }
      console.log('/device/center/create => success,center is created Now \n macAddr: '+macAddr+' Name: '+name);
      callback(null, {result  : true,
                      data    : center});

    })
  })

}


//Update Data Next Step
//Update All
function updateName(_id, name, callback) {
  // body...
  Center.findById({_id : _id}, function (error, center) {
    // body...
    if (error) {
      return callback(error)
    }
    if (!center) {
      console.log('/device/center/updateName => fail,center is not exist \n center_id: '+_id);
      return callback(null,{result  : false,
                            message : "fail,center is not exist"})
    }
    console.log("Now Update Center Name : center_id : "+_id +"oldName : "+center.name);

    if (name) {center.name= name}
    console.log("Now Update Center Name : center_id : "+_id +"NewName : "+center.name);

    return center.save(function (error, center) {
      // body...
      if (error) {
        console.log('/device/center/updateName => fail to update \n center_id: '+_id);
        return callback(error)
      }
      console.log('/device/center/updateName => success, center is update \n center_id: '+_id+' Name: '+inedot.name);
      callback(null,{result : true,
                     data   : center})
    })
  })
}


//Update ConnectState
function updateConnectState(_id, connectState, callback) {
  // body...
  Center.findById({_id : _id}, function (error, center) {
    // body...
    if (error) {
      return callback(error)
    }
    if (!center) {
      console.log('/device/center/updateConnectState => fail,center is not exist \n center_id: '+_id);
      return callback(null,{result  : false,
                            message : "fail,center is not exist"})
    }

    if (connectState) {center.connectState = connectState}

    return center.save(function (error, center) {
      // body...
      console.log("savesuccess");
      if (error) {
        console.log('/device/center/updateConnectState => fail to update \n center_id: '+_id);
        return callback(error)
      }
      console.log('/device/center/updateConnectState => success, center is update \n center_id: '+_id+' Name: '+inedot.name);
      callback(null,{result : true,
                     data   : center})
    })
  })
}

//Add DeviceList
function addDeviceList(_id, inedot_id, callback) {
  // body...
  Center.findById({_id : _id},function (error, center) {
    // body...
    if (error) {
      return callback(error)
    }
    //1. Check Center is exist
    if (!center) {
      console.log('/device/center/addDeviceList => no such center');
      return callback(null, {result  : false,
                             message : 'no such center'});
      }

    //2.check inedot is not in this deviceList
    var deviceList = center.deviceList
    for (var i = 0; i < deviceList.length; i++) {

      if (deviceList[i] == inedot_id) {
        return callback(null, {result  : false,
                               message : 'inedot is already in use'});
      }
    }

    //3.Add inedot in to center.deviceList
    center.DeviceList.push(inedot_id)

    return center.save(function (error, center) {
      // body...
      if (error) {
        console.log('/device/center/addDeviceList => fail to update');
        return callback(error)
      }
      console.log('/device/center/addDeviceList => success, center is update');
      callback(null,{result : true,
                     data   : center})

    })
  })

}


//delete DeviceList
function deleteDeviceList(_id, inedot_id, callback) {
  // body...
  Center.findById({_id : _id},function (error, center) {
    // body...
    if (error) {
      return callback(error)
    }

    if (!center) {
      console.log('/device/center/deleteDeviceList => no such person');
      return callback(null, {result  : false,
                             message : 'no such person'});
      }

     var deviceList = center.deviceList
     for (var i = 0; i < deviceList.length; i++) {
        if (deviceList[i] == inedot_id) {
          center.deviceList.splice(i, 1)
          break;
        }
      }

    return center.save(function (error, center) {
      // body...
      if (error) {
        console.log('/device/center/deleteDeviceList => fail to update');
        return callback(error)
      }
      console.log('/device/center/deleteDeviceList => success, center is update');
      callback(null,{result : true,
                     data   : center})
    })
  })

}


//Add ConnectingDevice
function addConnectingDevice(argument) {
  // body...
  Center.findById({_id : _id},function (error, center) {
    // body...
    if (error) {
      return callback(error)
    }
    //1. Check Center is exist
    if (!center) {
      console.log('/device/center/addConnectingDevice => no such center');
      return callback(null, {result  : false,
                             message : 'no such center'});
      }

    //2.check inedot is not in this connectingDevice
    var connectingDevice = center.connectingDevice
    for (var i = 0; i < connectingDevice.length; i++) {

      if (connectingDevice[i] == inedot_id) {
        return callback(null, {result  : false,
                               message : 'inedot is already in use'});
      }
    }

    //3.Add inedot in to center.connectingDevice
    center.connectingDevice.push(inedot_id)

    return center.save(function (error, center) {
      // body...
      if (error) {
        console.log('/device/center/addConnectingDevice => fail to update');
        return callback(error)
      }
      console.log('/device/center/addConnectingDevice => success, center is update');
      callback(null,{result : true,
                     data   : center})

    })
  })

}

//Delete ConnectingDevice
function deleteConnectingDevice(argument) {
  // body...
  Center.findById({_id : _id},function (error, center) {
    // body...
    if (error) {
      return callback(error)
    }

    if (!center) {
      console.log('/device/center/deleteConnectingDevice => no such person');
      return callback(null, {result  : false,
                             message : 'no such person'});
      }

     var connectingDevice = center.connectingDevice
     for (var i = 0; i < connectingDevice.length; i++) {
        if (connectingDevice[i] == inedot_id) {
          center.connectingDevice.splice(i, 1)
          break;
        }
      }

    return center.save(function (error, center) {
      // body...
      if (error) {
        console.log('/device/center/deleteConnectingDevice => fail to update');
        return callback(error)
      }
      console.log('/device/center/deleteConnectingDevice => success, center is update');
      callback(null,{result : true,
                     data   : center})
    })
  })

}

function deleteById(_id, callback) {
  // body...
  Center.findOne({_id : _id},function (error, center) {
    // body...
    if (error) {
      callback(error)
    }
    if (!center) {
      console.log('/device/center/deleteById => fail,center is not exist');
      return callback(null,{result  : false,
                            message : "fail,center is not exist"})
    }

    center.remove(function (error) {
      // body...
      if (error) {
        console.log('/device/center/deleteById => fail, can not delete \n center_id: '+_id);
        return callback(error)
      }
      console.log('/device/center/deleteById => success, center is delete \n center_id: '+_id);
      callback(null,{result  : true,
                     message : 'success, center is delete'})

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

  updateName          : updateName,
  updateConnectState  : updateConnectState,
  addDeviceList       : addDeviceList,
  deleteDeviceList    : deleteDeviceList,
  addConnectingDevice : addConnectingDevice,
  deleteConnectingDevice  : deleteConnectingDevice,

  deleteById          : deleteById


}
