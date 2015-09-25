require('./dbModel');
var mongoose = require('mongoose');
var CPush  = mongoose.model('c_push')

/*==================================================*/

function findAll(callback) {
  // body...
  CPush.find(function (error, cpushs) {
    // body...
    if (error) {
      return callback(error)
    }
    callback(null, cpushs)
  })
}

function findByMacAddr(center_macAddr, callback) {
  // body...
  CPush.find({center_macAddr  : center_macAddr}, function (error, cpushs) {
    // body...
    if (error) {
      return callback(error)
    }
    callback(null,cpushs)
  })
}

function findById(_id, callback) {
  // body...
  CPush.find({_id  : _id}, function (error, cpush) {
    // body...
    if (error) {
      return callback(error)
    }
    callback(null,cpush)
  })
}

function create(center_macAddr, inedot_macAddr, command, callback) {
  // body...

    //1. Create CPush
    CPush.create({
      center_macAddr  : center_macAddr,
      inedot_macAddr  : inedot_macAddr,
      command         : command,
      checkMark       : false

    },function (error, cpush) {
      // body...
      if (error) {
        console.log('CPush Create=> fail to create cpush');
        return callback(error)
      }
      console.log('CPush Create => success,cpush is created Now');
      callback(null, {result  : true,
                      data    : cpush});
    })

}


//Update Data Next Step
//Update CheckMark
function updateCheckMark(_id, callback) {
  // body...
  Cpush.findById({_id : _id}, function (error, cpush) {
    // body...
    if (error) {
      return callback(error)
    }
    if (!cpush) {
      console.log('CPush UpdateCheckMark => fail,cpush is not exist');
      return callback(null,{result  : false,
                            message : "fail,cpush is not exist"})
    }
    // console.log("Now Update Center Name : center_id : "+_id +"oldName : "+center.name);
    cpush.checkMark = true
    // console.log("Now Update Center Name : center_id : "+_id +"NewName : "+center.name);

    return cpush.save(function (error, cpush) {
      // body...
      if (error) {
        console.log('CPush UpdateCheckMark => fail to update');
        return callback(error)
      }
      console.log('CPush UpdateCheckMark => success, cpush is update');
      callback(null,{result : true,
                     data   : cpush})
    })
  })
}


function deleteById(_id, callback) {
  // body...
  Cpush.findOne({_id : _id},function (error, cpush) {
    // body...
    if (error) {
      callback(error)
    }
    if (!cpush) {
      console.log('CPush deleteById => fail,cpush is not exist');
      return callback(null,{result  : false,
                            message : "fail,cpush is not exist"})
    }

    center.remove(function (error) {
      // body...
      if (error) {
        console.log('CPush deleteById => fail,cpush can not delete ');
        return callback(error)
      }
      console.log('CPush deleteById => success, cpush is delete');
      callback(null,{result  : true,
                     message : 'success, cpush is delete'})

    })
  })
}


function Center_FindByMacAddr(center_macAddr, callback) {
  // body...
  CPush.find({center_macAddr  : center_macAddr, checkMark : false},
  function (error, cpushs) {
    // body...
    if (error) {
      return callback(error)
    }

    var result = []
    for (var i = 0; i < cpushs.length; i++) {

      var _id             = cpushs[i]._id
      var inedot_macAddr  = cpushs[i].inedot_macAddr
      var command         = cpushs[i].command

      var _cpush = {"_id"             : _id,
                    "inedot_macAddr"  : inedot_macAddr,
                    "command"         : command}

      result.push(cpush)
    }

    callback(null,result)

  })
}


module.exports = {

  findAll             : findAll,
  findByMacAddr       : findByMacAddr,
  findById            : findById,

  create              : create,

  updateCheckMark     : updateCheckMark,

  deleteById          : deleteById,

  Center_FindByMacAddr  : Center_FindByMacAddr


}
