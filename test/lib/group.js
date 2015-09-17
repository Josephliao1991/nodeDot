require('./dbModel');
var mongoose  = require('mongoose');
var Group     = mongoose.model('group')

//Connect TO MONGODB
// var be_ip   = "10.240.72.88:80"
// var dbName  = "/myDatabase"
// mongoose.connect('mongodb://'+be_ip+dbName)


/*=======================================================================================*/
//cehck function
function checkExist(person_id, name, callback) {
  // body...
  Group.find({leader : person_id, name : name},function (error, group) {
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

function checkExistById(_id, callback) {
  // body...
  Group.find({_id : _id},function (error, group) {
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
    console.log('/Group/findAll => \n'+group);
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
    console.log('/Group/findById => \n'+group);
    callback(null,group)
  })
}

function findByLeader(person_id, callback) {
  // body...
  Group.find({leader : person_id},function (error, groups) {
    // body...
    if (error) {
      return callback(error)
    }
    console.log('/Group/findByLeader => \n'+groups);
    callback(null,groups)
  })
}

function create(person_id, name, callback) {
  // body...
  //check if leader & name is create before!
  checkExist(person_id, name, function (error, exist) {
    // body...
    if (error) {
      return callback(error)
    }

    if (exist) {
      console.log('/Group/create => fail,group is exist');
      return callback(null,{result  : false,
                            message : "fail,group is exist"})
    }

    var leader_create   = person_id
    var name_create     = name
    var member_create   = []
    // var listenDevice_create = listenDevice
    var date_create     = new Date()

    Group.create(
      {
        leader    : leader_create,
        name      : name_create,
        members   : member_create,
        date      : date_create

      },function (error, group) {
        // body...
        if (error) {
          console.log('/Group/create => fail to create group');
          return callback(error)
        }
        console.log('/Group/create => success,group is createNow');
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
       console.log('/Group/update => no such group');
       return callback(null, {result  : true,
                              message : 'no such group'});
     }

    //  if (!name)
    //     return callback(null, {result : false,
    //                            message  : 'lost some params'})

     group.name      = name

     return group.save(function (error, group) {
       // body...
       if (error) {
         console.log('/Group/update => fail to update');
         return callback(error)
       }
       console.log('/Group/update => success, group is update');
       callback(null,{result : true,
                      data   : group})

     })
   })
 }

//Not Opwn Now
 function updateLeader(_id, leader_id, callback) {
   // body...
   Group.findById({_id : _id},function (error, group) {
     // body..
     if (error) {
       return callback(error)
     }

     if (!group) {
       console.log('/Group/update => no such group');
       return callback(null, {result  : false,
                              message : 'no such group'});
     }

    //  if (!leader_id)
    //     return callback(null, {result : false,
    //                            message  : 'lost some params'})

     group.leader.person_id = leader_id

     return group.save(function (error, group) {
       // body...
       if (error) {
         console.log('/Group/update => fail to update');
         return callback(error)
       }
       console.log('/Group/update => success, group is update');
       callback(null,{result : true,
                      data   : group})
     })

   })
 }

 function addMember(_id, member_id, callback) {
   // body...
   Group.findById({_id : _id},function (error, group) {
     // body..
     if (error) {
       return callback(error)
     }

     if (!group) {
       console.log('/Group/updateGroup => no such group');
       return callback(null, {result  : false,
                              message : 'no such group'});
     }

    //  if (!member_id)
    //     return callback(null, {result : false,
    //                            message  : 'lost some params'})

    //Ref db


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
       console.log('/Group/delete => "fail, no such group"');
       return callback(null, {result  : false,
                              message : "fail, no such group"})
     }

     //Ref db
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


 function deleteGroup(leader, name ,callback) {
   // body...
   Group.findOne({leader : leader, name : name},function (error, group) {
     // body...
     if (error) {
       return callback(error)
     }

     if (!group) {
       console.log('/Group/delete => "fail, no such group"');
       return callback(null, {result  : false,
                              message : "fail, no such group"})
     }

     group.remove(function (error) {
       // body...
       if (error) {
         console.log('/Group/delete => fail, can not delete');
         return callback(error)
       }
       console.log('/Group/delete => success, group is delete');
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
       console.log('/Group/deleteById => "fail, no such group"');
       return callback(null, {result  : false,
                              message : 'fail, no such group'})
     }

     group.remove(function (error) {
       // body...
       if (error) {
         console.log('/Group/deleteById => fail, can not delete');
         return callback(error)
       }
       console.log('/Group/deleteById => success, group is delete');
       callback(null,{result  : true,
                      message : 'success, group is delete'})
     })
   })
 }


 module.exports = {

   checkExistById     : checkExistById,

   findById       : findById,
   findByLeader   : findByLeader,
   findAll        : findAll,

   create         : create,
   updateName     : updateName,
   updateLeader   : updateLeader,

   deleteGroup         : deleteGroup,
   deleteById     : deleteById,

   addMember      : addMember,
   deleteMember   : deleteMember

 }
