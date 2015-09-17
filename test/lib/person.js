require('./dbModel');
var mongoose  = require('mongoose');
var Person    = mongoose.model('person')

/*=======================================================================================*/
//cehck function
function checkExist(ssid, callback) {
  // body...
  Person.find({ssid : ssid},function (error, person) {
    // body...
    if (error) {
      return callback(error)
    }

    if (person.length > 0) {
      callback(null,1)
    }else {
      callback(null,null)
    }
  })
}

function checkExistById(_id, callback) {
  // body...
  Person.find({_id : _id},function (error, person) {
    // body...
    if (error) {
      return callback(error)
    }

    if (person.length > 0) {
      callback(null,1)
    }else {
      callback(null,null)
    }
  })
}


/*=======================================================================================*/

function findAll(callback) {
  // body...
  Person.find(function (error, people) {
    // body...
    if (error) {
      return callback(error)
    }
    console.log('/Person/findAll => \n'+people);
    callback(null,people)
  })
}


function findById(_id, callback) {
  // body...
  Person.find({_id : [_id]},function (error, person) {
    // body...
    if (error) {
      return callback(error)
    }
    console.log('/Person/findById => '+person);
    callback(null,person)
  })
}

function findBySSID(ssid, callback) {
  // body...
  Person.find({ssid : ssid},function (error, person) {
    // body...
    if (error) {
      return callback(error)
    }
    console.log('/Person/findBySSID => \n'+person);
    callback(null,person)
  })
}

function create(ssid, pwd, callback) {
  // body...
  //check if leader & name is create before!
  checkExist(ssid, function (error, exist) {
    // body...
    if (error) {
      return callback(error)
    }

    if (exist) {
      console.log('/Person/create => fail,person is exist \n SSID: '+ssid);
      return callback(null,{result  : false,
                            message : "fail,person is exist"})
    }

    var ssid_create   = ssid
    var pwd_create    = pwd
    var phones_create  = []
    var selfGroups_create   = []
    var joinGroups_create   = []
    var centers_create      = []
    var inedots_create      = []
    // var listenDevice_create = listenDevice
    var date_create     = new Date()

    Person.create(
      {
        ssid        : ssid_create,
        pwd         : pwd_create,
        phones      : phones_create,
        selfGroups  : selfGroups_create,
        joinGroups  : joinGroups_create,
        centers     : centers_create,
        inedots     : inedots_create,
        // listenDevice  : {first:"listenDevice_create"},
        date      : date_create

      },function (error, person) {
        // body...
        if (error) {
          console.log('/Person/create => fail to create person \nSSID '+ssid);
          return callback(error)
        }
        console.log('/Person/create => success,person is createNow');
        callback(null, {result  : true,
                        data    : person});
      }
    )
  })
 }



 function addPhone(_id, phone_id, callback) {
   // body...
   Person.findById({_id : _id},function (error, person) {
     // body...
     if (error) {
       return callback(error)
     }

     if (!person) {
       console.log('/Person/addPhone => no such person');
       return callback(null, {result  : false,
                              message : 'no such person'});
       }

     person.phones.push(phone_id)

     return person.save(function (error, person) {
       // body...
       if (error) {
         console.log('/Person/addPhone => fail to update');
         return callback(error)
       }
       console.log('/Person/addPhone => success, person is update');
       callback(null,{result : true,
                      data   : person})

     })
   })
 }

 function deletePhone(_id, phone_id, callback) {
   // body...
   Person.findById({_id : _id},function (error, person) {
     // body...
     if (error) {
       return callback(error)
     }

     if (!person) {
       console.log('/Person/deletePhone => no such person');
       return callback(null, {result  : false,
                              message : 'no such person'});
       }

      var phones = person.phones
      for (var i = 0; i < phones.length; i++) {
         if (phones[i]._id == phone_id) {
           person.phones.splice(i, 1)
           // console.log('aaron.stories[i]'+aaron.stories[i]);
         }
       }

     return person.save(function (error, person) {
       // body...
       if (error) {
         console.log('/Person/deletePhone => fail to update');
         return callback(error)
       }
       console.log('/Person/deletePhone => success, person is update');
       callback(null,{result : true,
                      data   : person})
     })
   })
 }

 function addSelfGroup(_id, group_id, callback) {
   // body...
   Person.findById({_id : _id},function (error, person) {
     // body...
     if (error) {
       return callback(error)
     }

     if (!person) {
       console.log('/Person/addSelfGroup => no such person');
       return callback(null, {result  : false,
                              message : 'no such person'});
       }

     person.selfGroups.push(group_id)

     return person.save(function (error, person) {
       // body...
       if (error) {
         console.log('/Person/addSelfGroup => fail to update');
         return callback(error)
       }
       console.log('/Person/addSelfGroup => success, person is update');
       callback(null,{result : true,
                      data   : person})

     })
   })
 }

 function deleteSelfGroup(_id, group_id, callback) {
   // body...
   Person.findById({_id : _id},function (error, person) {
     // body...
     if (error) {
       return callback(error)
     }

     if (!person) {
       console.log('/Person/deleteSelfGroup => no such person');
       return callback(null, {result  : false,
                              message : 'no such person'});
       }

      var selfGroups = person.selfGroups
      for (var i = 0; i < selfGroups.length; i++) {
         if (selfGroups[i]._id == group_id) {
           person.selfGroups.splice(i, 1)
           // console.log('aaron.stories[i]'+aaron.stories[i]);
         }
       }

     return person.save(function (error, person) {
       // body...
       if (error) {
         console.log('/Person/deleteSelfGroup => fail to update');
         return callback(error)
       }
       console.log('/Person/deleteSelfGroup => success, person is update');
       callback(null,{result : true,
                      data   : person})
     })
   })
 }


 function addJoinGroup(_id, group_id, callback) {
   // body...
   Person.findById({_id : _id},function (error, person) {
     // body...
     if (error) {
       return callback(error)
     }

     if (!person) {
       console.log('/Person/addJoinGroup => no such person');
       return callback(null, {result  : false,
                              message : 'no such person'});
       }

     person.joinGroups.push(group_id)

     return person.save(function (error, person) {
       // body...
       if (error) {
         console.log('/Person/addJoinGroup => fail to update');
         return callback(error)
       }
       console.log('/Person/addJoinGroup => success, person is update');
       callback(null,{result : true,
                      data   : person})

     })
   })
 }

 function deleteJoinGroup(_id, group_id, callback) {
   // body...
   Person.findById({_id : _id},function (error, person) {
     // body...
     if (error) {
       return callback(error)
     }

     if (!person) {
       console.log('/Person/deleteJoinGroup => no such person');
       return callback(null, {result  : false,
                              message : 'no such person'});
       }

      var joinGroups = person.joinGroups
      for (var i = 0; i < joinGroups.length; i++) {
         if (joinGroups[i]._id == group_id) {
           person.joinGroups.splice(i, 1)
           // console.log('aaron.stories[i]'+aaron.stories[i]);
         }
       }

     return person.save(function (error, person) {
       // body...
       if (error) {
         console.log('/Person/deleteJoinGroup => fail to update');
         return callback(error)
       }
       console.log('/Person/deleteJoinGroup => success, person is update');
       callback(null,{result : true,
                      data   : person})
     })
   })
 }



 function addCenter(_id, center_id, callback) {
   // body...
   Person.findById({_id : _id},function (error, person) {
     // body...
     if (error) {
       return callback(error)
     }

     if (!person) {
       console.log('/Person/addCenter => no such person');
       return callback(null, {result  : false,
                              message : 'no such person'});
       }

     person.centers.push(center_id)

     return person.save(function (error, person) {
       // body...
       if (error) {
         console.log('/Person/addCenter => fail to update');
         return callback(error)
       }
       console.log('/Person/addCenter => success, person is update');
       callback(null,{result : true,
                      data   : person})

     })
   })
 }

 function deleteCenter(_id, center_id, callback) {
   // body...
   Person.findById({_id : _id},function (error, person) {
     // body...
     if (error) {
       return callback(error)
     }

     if (!person) {
       console.log('/Person/deleteCenter => no such person');
       return callback(null, {result  : false,
                              message : 'no such person'});
       }

      var centers = person.centers
      for (var i = 0; i < centers.length; i++) {
         if (centers[i]._id == center_id) {
           person.centers.splice(i, 1)
           // console.log('aaron.stories[i]'+aaron.stories[i]);
         }
       }

     return person.save(function (error, person) {
       // body...
       if (error) {
         console.log('/Person/deleteCenter => fail to update');
         return callback(error)
       }
       console.log('/Person/deleteCenter => success, person is update');
       callback(null,{result : true,
                      data   : person})
     })
   })
 }


 function addiNedot(_id, inedot_id, callback) {
   // body...
   Person.findById({_id : _id},function (error, person) {
     // body...
     if (error) {
       return callback(error)
     }

     if (!person) {
       console.log('/Person/addiNedot => no such person');
       return callback(null, {result  : false,
                              message : 'no such person'});
       }

     person.inedots.push(inedot_id)

     return person.save(function (error, person) {
       // body...
       if (error) {
         console.log('/Person/addiNedot => fail to update');
         return callback(error)
       }
       console.log('/Person/addiNedot => success, person is update');
       callback(null,{result : true,
                      data   : person})

     })
   })
 }

 function deleteiNedot(_id, inedot_id, callback) {
   // body...
   Person.findById({_id : _id},function (error, person) {
     // body...
     if (error) {
       return callback(error)
     }

     if (!person) {
       console.log('/Person/deleteiNedot => no such person');
       return callback(null, {result  : false,
                              message : 'no such person'});
       }

      var inedots = person.inedots
      for (var i = 0; i < inedots.length; i++) {
         if (inedots[i]._id == inedot_id) {
           person.inedots.splice(i, 1)
           // console.log('aaron.stories[i]'+aaron.stories[i]);
         }
       }

     return person.save(function (error, person) {
       // body...
       if (error) {
         console.log('/Person/deleteiNedot => fail to update');
         return callback(error)
       }
       console.log('/Person/deleteiNedot => success, person is update');
       callback(null,{result : true,
                      data   : person})
     })
   })
 }


 function deleteById(_id, callback) {
   // body...
   Person.findOne({_id : _id},function (error, person) {
     // body...
     if (error) {
       return callback(error)
     }

     if (!person) {
       console.log('/Person/deleteById => "fail, no such person"');
       return callback(null, {result  : false,
                              message : "fail, no such person"})
     }

     //wait for delete all dbref connect

     person.remove(function (error) {
       // body...
       if (error) {
         console.log('/Person/deleteById => fail, can not delete');
         return callback(error)
       }
       console.log('/Person/deleteById => success, person is delete');
       callback(null,{result  : true,
                      message : "success, person is delete"})
     })
   })
 }


 module.exports = {

   checkExistById : checkExistById,

   findById       : findById,
   findAll        : findAll,

   create         : create,

   deleteById     : deleteById,

   addPhone      : addPhone,
   deletePhone   : deletePhone,

   addSelfGroup      : addSelfGroup,
   deleteSelfGroup   : deleteSelfGroup,

   addJoinGroup      : addJoinGroup,
   deleteJoinGroup   : deleteJoinGroup,

   addCenter      : addCenter,
   deleteCenter   : deleteCenter,

   addiNedot      : addiNedot,
   deleteiNedot   : deleteiNedot,


 }
