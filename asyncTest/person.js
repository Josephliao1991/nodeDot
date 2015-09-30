require('./dbModel.js');
var mongoose = require('mongoose');
var Person = mongoose.model('person')

function checkExistByName(name, callback) {
  // body...
  Person.findOne({name : name}, function (error, person) {
    // body...
    if (error) {
      callback(error)
    }

    if (person) {
      callback(null,1)
    }

    callback(null,null)

  })
}

function checkExistById(_id, callback) {
  // body...
  Person.findOne({_id : _id}, function (error, person) {
    // body...
    if (error) {
      callback(error)
    }

    if (person) {
      callback(null,1)
    }

    callback(null,null)

  })
}

//Check Which Element Is Exist At Index
var indexOf = function(needle) {
    if(typeof Array.prototype.indexOf === 'function') {
        indexOf = Array.prototype.indexOf;
    } else {
        indexOf = function(needle) {
            var i = -1, index = -1;

            for(i = 0; i < this.length; i++) {
                if(this[i] === needle) {
                    index = i;
                    break;
                }
            }

            return index;
        };
    }

    return indexOf.call(this, needle);
};

/*======================================*/

function create(name, callback) {
  // body...
  checkExistByName(name, function (error, exist) {
    // body...
    if (error) {
      callback(error)
    }

    if (exist) {
      callback(null, {result  : false,
                      message : "Fail, Person Is ExisteD!" })
    }

    Person.create({
      name    : name,
      stories : []
    },function (error, person) {
      // body...
      if (error) {
        callback(error)
      }

      callback(null,{result : true,
                     data   : person})
   })
 })
}

function findAll(callback) {
  // body...
  Person.findById(function (error, persons) {
    // body...
    if (error) {
      callback(error)
    }

    callback(null, persons)

  })
}

function findById(_id, callback) {
  // body...
  Person.findById({_id : _id}, function (error, person) {
    // body...
    if (error) {
      callback(error)
    }

    callback(null, person)

  })
}

function updateName(_id, name, callback) {
  // body...
  Person.findById({_id : _id},function (error, person) {
    // body...
    if (error) {
      callback(error)
    }

    if (!person) {
      callback(null, {result  : false,
                      message : "Fail, Person Is Not ExisteD!" })
    }

    person.name = name

    return person.save(function (error, person) {
      // body...
      if (error) {
        callback(error)
      }
      callback(null, {result  : true,
                      data    : person})

    })
  })
}

function addStory(person_id, story_id, callback) {
  // body...
  Person.findById({_id : person_id},function (error, person) {
    // body...
    if (error) {
      callback(error)
    }

    if (!person) {
      callback(null, {result  : false,
                      message : "Fail, Person Is Not ExisteD!" })
    }

    //Check Story Is Exist
    var stories = person.stories
    var index = indexOf.call(stories, story_id)
    if (index>=0) {
      // person.stories.splice(index, 1)
      callback(null, {result  : false,
                      message : "Fail, Story Is ExisteD!" })
    }

    person.stories.push(story_id)

    return person.save(function (error, person) {
      // body...
      if (error) {
        callback(error)
      }
      callback(null, {result  : true,
                      data    : person})

    })
  })
}

function deleteStory(person_id, story_id, callback) {
  // body...
  Person.findById({_id : person_id},function (error, person) {
    // body...
    if (error) {
      callback(error)
    }

    if (!person) {
      callback(null, {result  : false,
                      message : "Fail, Person Is Not ExisteD!" })
    }

    var stories = person.stories
    var index = indexOf.call(stories, story_id)
    if (index>=0) {
      person.stories.splice(index, 1)
    }

    return person.save(function (error, person) {
      // body...
      if (error) {
        callback(error)
      }
      callback(null, {result  : true,
                      data    : person})

    })
  })
}


module.exports = {
  checkExistByName  : checkExistByName,
  checkExistById    : checkExistById,

  create            : create,
  findAll           : findAll,
  findById          : findById,
  updateName        : updateName,
  addStory          : addStory,
  deleteStory       : deleteStory

}
