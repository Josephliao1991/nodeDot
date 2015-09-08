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
      return callback(null,{result  : "fail,group is exist"})
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
        callback(null, {result:"success,group is createNow"});
      }
    )
  })
 }

 function updateGroup(_id, name, leader, member, listenDevice, callback) {
   // body...
   Group.findById({_id : _id},function (error, group) {
     // body..
     if (error) {
       return callback(error)
     }

     if (!group) {
       console.log('/Group/updateGroup => no such device');
       return callback(null,{result : "no such device"})
     }

     if (name)    group.name = name
     if (leader)  group.leader = leader
     if (member)  group.listenDevice  = listenDevice

     return group.save(function (error) {
       // body...
       if (error) {
         console.log('/Group/updateGroup => fail to update');
         return callback(error)
       }

       callback(null,{result : 'success, group is update'})

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
       return callback(null, {result : "fail, no such group"})
     }

     group.remove(function (error) {
       // body...
       if (error) {
         console.log('/Group/deleteGroup => fail, can not delete');
         return callback(error)
       }
       console.log('/Group/deleteGroup => success, group is delete');
       callback(null,{result : "success,group is delete"})
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
       return callback(null, {result : "fail, no such group"})
     }

     group.remove(function (error) {
       // body...
       if (error) {
         console.log('/Group/deleteGroupById => fail, can not delete');
         return callback(error)
       }
       console.log('/Group/deleteGroupById => success, group is delete');
       callback(null,{result : "success,group is delete"})
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
