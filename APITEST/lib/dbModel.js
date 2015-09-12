var mogoose = require('mongoose');

var Schema = mongoose.Schema;
var phone  = new Schema({

  name    : String,
  number  : String

})

mongoose.model( 'phone', phone );
