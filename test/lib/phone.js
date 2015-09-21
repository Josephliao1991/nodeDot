require('./dbModel');
var mongoose  = require('mongoose');
var Phone     = mongoose.model('phone')

function checkExistByUUID(uuid, callback) {
  // body...
  Phone.find({uuid  : uuid}, function (error, phones) {
    // body...
    if (error) {
      return callback(error)
    }
    if (phones.length > 0) {
      return callback(null,1)
    }

    callback(null,null)
  })
}

function checkExistById(_id, callback) {
  // body...
  Phone.find({_id  : _id}, function (error, phones) {
    // body...
    if (error) {
      return callback(error)
    }
    if (phones.length > 0) {
      return callback(null,1)
    }

    callback(null,null)
  })
}

/*============================================================*/

function findAll(callback) {
  // body...
  Phone.find(function (error, phones) {
    // body...
    if (error) {
      return callback(error)
    }

    callback(null, phones)
  })
}

function findByUUID(uuid, callback) {
  // body...
  Phone.find({uuid : uuid},function (error, phones) {
    // body...
    if (error) {
      return callback(error)
    }
    console.log('/Phone/findByUUId => \n'+phones);
    callback(null, phones)
  })
}

function findByUUIDs(uuids, callback) {
  // body...
  Phone.find({uuid : {$in:uuids}},function (error, phones) {
    // body...
    if (error) {
      return callback(error)
    }
    console.log('/Phone/findByUUIds => \n'+phones);
    callback(null, phones)
  })
}


function findById(_id, callback) {
  // body...
  Phone.find({_id : _id},function (error, phones) {
    // body...
    if (error) {
      return callback(error)
    }
    console.log('/Phone/findById => \n'+phones);
    callback(null, phones)
  })
}


function findByIds(_ids, callback) {
  // body...
  Phone.find({_id : {$in:_ids}},function (error, phones) {
    // body...
    if (error) {
      return callback(error)
    }
    console.log('/Phone/findByIds => \n'+phones);
    callback(null, phones)
  })
}


function create(operation, uuid, token, callback) {
  // body...
  //1. check phone(uuid) is exist
  checkExistByUUID(uuid, function (error, exist) {
    // body...
    if (error) {
      return callback(error)
    }
    if (exist) {
      console.log('/Phone/create => fail,phone is exist \n UUID: '+uuid);
      return callback(null,{result  : false,
                            message : "fail,phone is exist"})
    }

    Phone.create({
      operation : operation,
      uuid      : uuid,
      token     : token
    }, function (error, phone) {
      // body...
      if (error) {
        return callback(error)
      }
      console.log('/Phone/create => \n'+phone);
      callback(null,{result : true,
                     data   : phone})

    })
  })
}

function updateToken(_id, token, callback) {
  // body...
  Phone.findById({_id : _id}, function (error, phone) {
    // body...
    if (error) {
      return callback(error)
    }
    if (!phone) {
      console.log('/Phone/updateToken => no such phone');
      return callback(null, {result  : false,
                             message : 'no such phone'});
    }

    phone.token = token

    return phone.save(function (error, phone) {
      // body...
      if (error) {
        console.log('/Phone/updateToken => fail to update \n phone_id: '+_id+' token: '+token);
        return callback(error)
      }
      console.log('/Phone/updateToken => success, phone is update \n phone_id: '+_id+' token: '+token);
      callback(null,{result : true,
                     data   : phone})

    })
  })
}

function deleteById(_id, callback) {
  // body...
  Phone.findById({_id : _id}, function (error, phone) {
    // body...
    if (error) {
      return callback(error)
    }

    if (!phone) {
      console.log('/Phone/deleteById => no such phone');
      return callback(null, {result  : false,
                             message : 'no such phone'});
    }

    phone.remove(function (error) {
      // body...
      if (error) {
        console.log('/Phone/deleteById => fail, can not delete');
        return callback(error)
      }
      console.log('/Phone/deleteById => success, phone is delete');
      callback(null,{result  : true,
                     message : "success, phone is delete"})
    })
  })
}



module.exports = {

  checkExistByUUID  : checkExistByUUID,
  checkExistById  : checkExistById,
  findAll         : findAll,
  findByUUID      : findByUUID,
  findByUUIDs     : findByUUIDs,
  findById        : findById,
  findByIds       : findByIds,

  create          : create,
  updateToken     : updateToken,

  deleteById      : deleteById

}
