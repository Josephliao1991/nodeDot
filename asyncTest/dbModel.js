var mongoose = require('mongoose');

var Schema   = mongoose.Schema;

var person = new Schema({
  name    : String,
  stories : [{type : Schema.ObjectId, ref : 'story'}]
})
mongoose.model( 'person', person );


var story = new Schema({
  title   : String,
  person  : {type : Schema.ObjectId, ref : 'person'}
})
mongoose.model( 'story', story );
