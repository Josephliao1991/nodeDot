require('./dbModel');
var mongoose  = require('mongoose');
var Group     = mongoose.model('group')

//Connect TO MONGODB
var be_ip   = "10.240.72.88:80"
var dbName  = "/myDatabase"
mongoose.connect('mongodb://'+be_ip+dbName)


/*=======================================================================================*/
//cehck function
function checkExist(leader, name, callback) {
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

function findAll(_id, callback) {
  // body...
  Group.find(function (error, group) {
    // body...
    if (error) {
      return callback(error)
    }
    console.log('/Group/findGroupAll => '+group);
    callback(null,group)
  })
}


function findById(_id, callback) {
  // body...
  Group.find({_id : [_id]},function (error, group) {
    // body...
    if (error) {
      return callback(error)
    }
    console.log('/Group/findGroupById => '+group);
    callback(null,group)
  })
}

function findByLeader(person_id, callback) {
  // body...
  Group.find({'leader.person_id' : person_id},function (error, group) {
    // body...
    if (error) {
      return callback(error)
    }
    console.log('/Group/findGroupById => '+group);
    callback(null,group)
  })
}

function create(leader, name, callback) {
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

 function updateName(_id, name, callback) {
   // body...
   Group.findById({_id : _id},function (error, group) {
     // body...
     if (error) {
       return callback(error)
     }

     if (!group) {
       console.log('/Group/updateGroup => no such group');
       callback(null, {result  : true,
                       data    : group});
                     }

     if (!name)
        return callback(null, {result : false,
                               message  : 'lost some params'})

     group.name      = name

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


   })

 }

 function updateLeader(_id, leader_id,leader_name, callback) {
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

 function addMember(_id, member_id, member_name, callback) {
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

 function deleteMember(_id, member_id, callback) {
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
    //  console.log(members.length);
     for (var i = 0; i < members.length; i++) {
      //  console.log('member '+members[i].person_id);
      if (members[i].person_id == member_id) {
        // console.log(members[i]);
        members.splice(i, 1)
        break;
      }
     }
    //  console.log('Member: '+group);

    return group.save(function (error, group) {
      // body...
      if (error) {
        console.log('/Group/deleteGroupMember => fail to update');
        return callback(error)
      }
      console.log('/Group/deleteGroupMember => success, group is update');
      callback(null,{result : true,
                     data   : group})

    })

   })
 }


 function delete(leader, name ,callback) {
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

 function deleteById(_id,callback) {
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

   findById       : findById,
   findByLeader   : findByLeader,
   findAll        : findAll,

   create         : create,
   updateName     : updateName,
   updateLeader   : updateLeader,

   delete         : delete,
   deleteById     : deleteById,

   addMember      : addMember,
   deleteMember   : deleteMember

 }
