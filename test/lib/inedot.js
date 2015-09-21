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

function create(macAddr, owner, connectState, name, battery, pushGroup, situation,callback) {
  // body...
  var macAddr        = macAddr
  var owner          = owner
  var connectState   = connectState
  var name           = name
  var battery        = battery
  var pushGroup      = pushGroup
  var situation      = situation

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
      situation      : situation

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

function updateSituation(_id, situation, callback) {
  // body...


}


function deleteById(_id, callback) {
  // body...
  inedot.findOne({_id : _id},function (error, inedot) {
    // body...
    if (error) {
      callback(error)
    }
    if (!inedot) {
      console.log('/device/inedot/create => fail,inedot is not exist');
      return callback(null,{result  : false,
                            message : "fail,inedot is not exist"})
    }

    inedot.remove(function (error) {
      // body...
      if (error) {
        console.log('/device/inedot/delete => fail, can not delete \n inedot_id: '+_id);
        return callback(error)
      }
      console.log('/device/inedot/delete => success, inedot is delete \n inedot_id: '+_id);
      callback(null,{result  : true,
                     message : 'success, group is delete'})

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
  deleteById          : deleteById


}
