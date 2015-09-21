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

function create(macAddr, owner, connectState, name, battery, pushGroup, situation) {
  // body...
  var macAddr_create        = macAddr
  var owner_create          = owner
  var connectState_create   = connectState
  var name_create           = name
  var battery_create        = battery
  var pushGroup_create      = []
  pushGroup_create  = pushGroup
  var situation_create      = situation

  console.log('macAddr_create: '+macAddr_create);
  console.log('owner_create: '+owner_create);
  console.log('connectState_create: '+connectState_create);
  console.log('name_create: '+name_create);
  console.log('battery_create: '+battery_create);
  console.log('pushGroup_create: '+pushGroup_create);
  console.log('situation_create: '+situation_create);


}


module.exports = {

  checkExistByMacAddr : checkExistByMacAddr,
  checkExistById      : checkExistById,
  findAll             : findAll,
  findByMacAddr       : findByMacAddr,
  findById            : findById,
  create              : create


}
