var mongoose = require("mongoose");
var Schema = mongoose.Schema;

//Connect TO MONGODB
// var be_ip   = "10.240.72.88:80"
// var dbName  = "/myDatabase"
// mongoose.connect('mongodb://'+be_ip+dbName)

var PersonSchema = new Schema({
    name    : String
  , age     : Number
  , stories : [{ type: Schema.ObjectId, ref: 'Story' }]
});
var StorySchema = new Schema({
    _creator : { type: Schema.ObjectId, ref: 'Person' }
  , title    : String
  , fans     : [{ type: Schema.ObjectId, ref: 'Person' }]
});
var Story  = mongoose.model('Story', StorySchema);
var Person = mongoose.model('Person', PersonSchema);


function dbrefTest() {
  // body...
  console.log("Test Start");

  // var aaron = new Person({name: 'Aaron', age: 100});

  Person.findOne({_id : "55f251512cd7c5f74fddc077"},function (error, aaron) {
    // body...
    aaron.save(function (err) {
      if (err) throw err;

      var story1 = new Story({
          title: "A man who cooked Nintendo"
        , _creator: aaron._id
      });

      story1.save(function (err) {
        if (err) throw err;

        aaron.stories.push(story1._id);
        aaron.save(function (err) {
          if (err) throw err;

          Person.findOne({name: "Aaron"}).populate('stories')
                  .run(function (err, person) {
            if (err) throw err;
            console.log("person =", person);
            console.log("person.stories =", person.stories[0]);
          })

          Story.findOne({title: /Nintendo/i}).populate('_creator')
                  .run(function (err, story) {
            if (err) throw err;
            console.log("story =", story);
          });
        });
      });
    });



  })


}

module.exports = {

  dbrefTest  : dbrefTest

}

// person = { stories: [ [object Object] ],
//   name: 'Aaron',
//   age: 100,
//   _id: 4e56698f15dff83410000001 }
// person.stories = { fans: [ ],
//   _id: 4e56698f15dff83410000002,
//   _creator: 4e56698f15dff83410000001,
//   title: 'A man who cooked Nintendo' }
// story = { fans: [ ],
//   _id: 4e56698f15dff83410000002,
//   _creator:
//    { stories: [ 4e56698f15dff83410000002 ],
//      name: 'Aaron',
//      age: 100,
//      _id: 4e56698f15dff83410000001 },
//   title: 'A man who cooked Nintendo' }
