var mogoose = require('mogoose');

var Schema = mongoose.Schema;
var phone  = new Schema({

  name    : String,
  number  : String

})

mongoose.model( 'phone', phone );
