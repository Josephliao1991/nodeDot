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
  checkExistByMacAddr(macAddr_create, function (error, exist) {
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
    inedot.create({
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
        callback(error)
      }
      callback(null, inedot)

    })
  })

}


module.exports = {

  checkExistByMacAddr : checkExistByMacAddr,
  checkExistById      : checkExistById,
  findAll             : findAll,
  findByMacAddr       : findByMacAddr,
  findById            : findById,
  create              : create


}
