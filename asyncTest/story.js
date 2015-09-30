require('./dbModel.js');
var mongoose = require('mongoose');
var Story = mongoose.model('story')

function checkExistByTitle(title, callback) {
  // body...
  Story.findOne({title : title}, function (error, story) {
    // body...
    if (error) {
      callback(error)
    }

    if (story) {
      callback(null,1)
    }

    callback(null,null)

  })
}

function checkExistById(_id, callback) {
  // body...
  Story.findOne({_id : _id}, function (error, story) {
    // body...
    if (error) {
      callback(error)
    }

    if (story) {
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

function create(title, person_id, callback) {
  // body...
  checkExistByTitle(title, function (error, exist) {
    // body...
    if (error) {
      return callback(error)
    }

    if (exist) {
      return callback(null, {result  : false,
                             message : "Fail, Story Is ExisteD!" })
    }

    Story.create({
      title    : title,
      person   : person_id
    },function (error, story) {
      // body...
      if (error) {
        return callback(error)
      }

      callback(null,{result : true,
                     data   : story})
   })
 })
}

function findAll(callback) {
  // body...
  Story.find(function (error, storys) {
    // body...
    if (error) {
      return callback(error)
    }

    callback(null, storys)

  })
}

function findById(_id, callback) {
  // body...
  Story.findOne({_id : _id}, function (error, story) {
    // body...
    if (error) {
      return callback(error)
    }

    callback(null, story)

  })
}

function updateTitle(_id, title, callback) {
  // body...
  Story.findOne({_id : _id},function (error, story) {
    // body...
    if (error) {
      return callback(error)
    }

    if (!story) {
      return callback(null, {result  : false,
                             message : "Fail, Story Is Not ExisteD!" })
    }

    story.title = title

    return story.save(function (error, story) {
      // body...
      if (error) {
        return callback(error)
      }
      callback(null, {result  : true,
                      data    : story})

    })
  })
}

function deleteById(story_id, callback) {
  // body...
  Story.findOne({_id : story_id},function (error, story) {
    // body...
    if (error) {
      return callback(error)
    }

    if (!story) {
      return callback(null, {result  : false,
                             message : "Fail, Story Is Not ExisteD!" })
    }

    story.remove(function (error) {
    // body...
    if (error) {
      return callback(error)
    }
    callback(null,{result  : true,
                   message : "Success, Story Is Delete"})
   })

  })
}

module.exports= {

  checkExistByTitle : checkExistByTitle,
  checkExistById    : checkExistById,
  create            : create,
  findAll           : findAll,
  findById          : findById,
  updataTitle       : updateTitle,
  deleteById        : deleteById

}
