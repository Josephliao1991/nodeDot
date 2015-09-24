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
    if (inedot.length > 0) {
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
    if (inedot.length > 0) {
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

function create() {
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
                            message : "fail,inedot is exist"})
    }
    //2. Create iNeDot
    Center.create({


    },function (error, center) {
      // body...
      if (error) {
        console.log('/device/center/create => fail to create center \n macAddr: '+macAddr+' Name: '+name);
        return callback(error)
      }
      console.log('/device/center/create => success,center is createNow \n macAddr: '+macAddr+' Name: '+name);
      callback(null, {result  : true,
                      data    : center});

    })
  })

}


//Update Data Next Step
//Update All
function updateAll(_id,  callback) {
  // body...
  Center.findById({_id : _id}, function (error, center) {
    // body...
    if (error) {
      return callback(error)
    }
    if (!center) {
      console.log('/device/center/updateAll => fail,center is not exist \n center_id: '+_id);
      return callback(null,{result  : false,
                            message : "fail,center is not exist"})
    }

    // if (connectState) {inedot.connectState = connectState}
    // if (name)         {inedot.name= name}
    // if (battery)      {inedot.battery = battery}
    // if (pushGroup)    {inedot.pushGroup = pushGroup}
    // if (situation)    {inedot.situation = situation}

    return center.save(function (error, center) {
      // body...
      if (error) {
        console.log('/device/center/updateAll => fail to update \n center_id: '+_id);
        return callback(error)
      }
      console.log('/device/center/updateAll => success, center is update \n center_id: '+_id+' Name: '+inedot.name);
      callback(null,{result : true,
                     data   : center})
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

  updateAll           : updateAll,

  deleteById          : deleteById


}
