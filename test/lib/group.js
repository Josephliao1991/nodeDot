require('./dbModel');
var mongoose  = require('mongoose');
var Group     = mongoose.model('group')

//Connect TO MONGODB
var be_ip   = "10.240.72.88:80"
var dbName  = "/myDatabase"
mongoose.connect('mongodb://'+be_ip+dbName)


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

function findGroupAll(_id, callback) {
  // body...
  Group.find(function (error, group) {
    // body...
    if (error) {
      return callback(error)
    }

    console.log('/Group/findGroup => '+group);
    callback(null,group)

  })

}


function findGroupById(_id, callback) {
  // body...
  Group.find({_id : [_id]},function (error, group) {
    // body...
    if (error) {
      return callback(error)
    }

    console.log('/Group/findGroup => '+group);
    callback(null,group)

  })

}

function createGroup(leader, name, callback) {
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
    // var listenDevice_create = listenDevice
    var date_create     = new Date()

    Group.create(
      {
        leader    : leader_create,
        name      : name_create,
        member    : member_create,
        // listenDevice  : {first:"listenDevice_create"},
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

 function updateGroupLeader(_id, leader_id,leader_name, callback) {
   // body...
   Group.findById({_id : _id},function (error, group) {
     // body..
     if (error) {
       return callback(error)
     }

     if (!group) {
       console.log('/Group/updateGroup => no such group');
       callback(null, {result  : true,
                       data    : group});
                     }

     if (!leader_id && !leader_name)
        return callback(null, {result : false,
                               message  : 'lost some params'})

     group.leader.person_id = leader_id
     group.leader.name      = leader_name

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

 function addGroupMember(_id, member_id, member_name, callback) {
   // body...
   Group.findById({_id : _id},function (error, group) {
     // body..
     if (error) {
       return callback(error)
     }

     if (!group) {
       console.log('/Group/updateGroup => no such group');
       callback(null, {result  : true,
                       data    : group});
                     }

     if (!member_id && !member_name)
        return callback(null, {result : false,
                               message  : 'lost some params'})

     var memberArray = group.member
     var newMember = {person_id : member_id, name : member_name}
     memberArray.push(newMember);

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

 function deleteGroupMember(_id, member_id, callback) {
   // body...
   Group.findOne({_id : _id},function (error, group) {
     // body...
     if (error) {
       return callback(error)
     }

     if (!group) {
       console.log('/Group/deleteGroup => "fail, no such group"');
       return callback(null, {result  : false,
                              message : "fail, no such group"})
     }

     var members = group.member
     for (var i = 0; i < members.length; i++) {
      if (members[i].person_id == member_id) {
        return delete.members[i]
      }
     }
     console.log('Member: '+group);

    //  group.remove(function (error) {
    //    // body...
    //    if (error) {
    //      console.log('/Group/deleteGroup => fail, can not delete');
    //      return callback(error)
    //    }
    //    console.log('/Group/deleteGroup => success, group is delete');
    //    callback(null,{result  : true,
    //                   message : "success, group is delete"})
    //  })
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

   findGroupById    : findGroupById,
   findGroupAll     : findGroupAll,
   createGroup      : createGroup,
   updateGroupLeader      : updateGroupLeader,
   deleteGroup      : deleteGroup,
   deleteGroupById  : deleteGroupById,
   addGroupMember      : addGroupMember,
   deleteGroupMember   : deleteGroupMember

 }
