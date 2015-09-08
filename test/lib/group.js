require('./dbModel');
var mongoose  = require('mongoose');
var Group     = mongoose.model('group')


/*=======================================================================================*/
//cehck function
function checkGroupExist(leader, name, callback) {
  // body...
  Group.find({leader : leader, name : name},function (error, group) {
    // body...
    if (error) {
      return callback(error)
    }

    if (group.length > 0) {
      callback(null,1)
    }else {
      callback(null,null)
    }

  })

}


/*=======================================================================================*/

function findGroup(_id, callback) {
  // body...
  Group.find({_id : _id},function (error, group) {
    // body...
    if (error) {
      return callback(error)
    }

    console.log('/Group/findGroup => '+group);
    callback(null,group)

  })

}

function createGroup(leader, name, listenDevice, callback) {
  // body...
  //check if leader & name is create before!
  checkGroupExist(leader, name, function (error, exist) {
    // body...
    if (error) {
      return callback(error)
    }

    if (exist) {
      console.log('/Group/createGroup => fail,group is exist');
      return callback(null,{result  : false,
                            message : "fail,group is exist"})
    }

    var leader_create   = leader
    var name_create     = name
    var member_create   = []
    var listenDevice_create = listenDevice
    var date_create     = new Date()

    Group.create(
      {
        leader    : leader_create,
        name      : name_create,
        member    : member_create,
        listenDevice  : listenDevice_create,
        date      : date_create

      },function (error, group) {
        // body...
        if (error) {
          console.log('/Group/createGroup => fail to create group');
          return callback(error)
        }
        console.log('/Group/createGroup => success,group is createNow');
        callback(null, {result  : true,
                        data    : group});
      }
    )
  })
 }

 function updateGroup(_id, leader, name, member, listenDevice, callback) {
   // body...
   Group.findById({_id : _id},function (error, group) {
     // body..
     if (error) {
       return callback(error)
     }

     if (!group) {
       console.log('/Group/updateGroup => no such device');
       callback(null, {result  : true,
                       data    : group});
                     }

     if (name)    group.name = name
     if (leader)  group.leader = leader
     if (member)  group.listenDevice  = listenDevice

     return group.save(function (error, group) {
       // body...
       if (error) {
         console.log('/Group/updateGroup => fail to update');
         return callback(error)
       }
       console.log('/Group/updateGroup => success, group is update');
       callback(null,{result : true,
                      data   : group})

     })

   })
 }

 function deleteGroup(leader, name ,callback) {
   // body...
   Group.findOne({leader : leader, name : name},function (error, group) {
     // body...
     if (error) {
       return callback(error)
     }

     if (!group) {
       console.log('/Group/deleteGroup => "fail, no such group"');
       return callback(null, {result  : false,
                              message : "fail, no such group"})
     }

     group.remove(function (error) {
       // body...
       if (error) {
         console.log('/Group/deleteGroup => fail, can not delete');
         return callback(error)
       }
       console.log('/Group/deleteGroup => success, group is delete');
       callback(null,{result  : true,
                      message : "success, group is delete"})
     })
   })
 }

 function deleteGroupById(_id,callback) {
   // body...
   Group.findOne({_id : _id},function (error, group) {
     // body...
     if (error) {
       return callback(error)
     }

     if (!group) {
       console.log('/Group/deleteGroupById => "fail, no such group"');
       return callback(null, {result : false})
     }

     group.remove(function (error) {
       // body...
       if (error) {
         console.log('/Group/deleteGroupById => fail, can not delete');
         return callback(error)
       }
       console.log('/Group/deleteGroupById => success, group is delete');
       callback(null,{result : true})
     })
   })
 }


 module.exports = {

   findGroup        : findGroup,
   createGroup      : createGroup,
   updateGroup      : updateGroup,
   deleteGroup      : deleteGroup,
   deleteGroupById  : deleteGroupById

 }
