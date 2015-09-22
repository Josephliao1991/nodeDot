var mongoose = require('mongoose');

//add at api layer
// //Connect To Mongodb
// var be_ip   = "10.240.72.88:80"
// var dbName  = "myDatabase"
// mongoose.connect('mongodb://'+be_ip+dbName)

//Set Data Model
var Schema   = mongoose.Schema;

var test = new Schema({
  first : String
})
mongoose.model( 'test', test );



// var group = new Schema({
//   name    : String,
//   leader  : {person_id : String, name : String}, //person_id
//   member  : [{person_id : String, name : String}],  //[person_id, person_id, person_id,,,]
//   // listenDevice  : {first : String},  //[macAddr, macAddr, macAddr,,,]
//   date    : Date
// });
// mongoose.model( 'group', group );

var group = new Schema({
  name    : String,
  leader  : {type: Schema.ObjectId, ref: 'person'}, //person_id
  members : [{type: Schema.ObjectId, ref: 'person'}],  //[person_id, person_id, person_id,,,]
  // listenDevice  : {first : String},  //[macAddr, macAddr, macAddr,,,]
  date    : Date
});
mongoose.model( 'group', group );


var person  = new Schema({
  ssid        : String, //SSID
  pwd         : String, //PASSWORD
  phones      : [{type: Schema.ObjectId, ref: 'phone'}],  //[deviceToken, deviceToken,,,]

  selfGroups  : [{type: Schema.ObjectId, ref: 'group'}],
  joinGroups  : [{type: Schema.ObjectId, ref: 'group'}],

  centers     : [{type: Schema.ObjectId, ref: 'center'}],  //[macAddr, macAddr, macAddr,,,]
  inedots     : [{type: Schema.ObjectId, ref: 'inedot'}],  //[macAddr, macAddr, macAddr,,,]

  date       : Date
  // authData  : Array   //[_id, _id, _id,,,]
})
mongoose.model('person', person);


var phone   = new Schema({
  operation : String,
  uuid      : String,
  token     : String
})
mongoose.model('phone', phone)



var center  = new Schema({
  macAddr           : String,   //macAddr
  owner             : String,   //person_id
  connectState      : Boolean,  //state True/False
  deviceList        : [{type: Schema.ObjectId, ref: 'inedot'}],    //[macAddr, macAddr, macAddr,,,]
  connectingDevice  : [{type: Schema.ObjectId, ref: 'inedot'}],    //[macAddr, macAddr, macAddr,,,]
  group_id          : String
})
mongoose.model( 'center', center );



var inedot  = new Schema({
  macAddr        : String, //macAddr
  owner          : {type: Schema.ObjectId, ref: 'person'}, //person_id or cneter_id
  connectState   : Boolean,
  name           : String,
  battery        : Number,

  pushGroup      : [{type: Schema.ObjectId, ref: 'group'}],  //[_id, _id, _id,,,]
  pushPoeple     : [{type: Schema.ObjectId, ref: 'person'}],  //[deviceToken, deviceToken,,,]

  situation      : [{type     :  Number,// 0 => mornitor , 1 => normal
                    mornitor : {alert : {enable : Boolean, value : Number},
                                temp  : {enable : Boolean, value : Number},
                                humi  : {enable : Boolean, value : Number},
                                baby  : {enable : Boolean},
                                area  : {enable : Boolean},
                                mesg  : {enable : Boolean, value : String}
                              },
                    normal   : {sport : {enable : Boolean},
                                pet   : {enable : Boolean},
                                find  : {enable : Boolean},
                                drop  : {enable : Boolean}
                              }
                            }]

})
mongoose.model( 'inedot', inedot );



var c_push  = new Schema({
  group_id          : String,
  center_macAddr    : String,
  inedot_macAddr    : String,
  command           : Number, // 0/1/2; disconnect /connect&setting /deleteFromList
  checkMark         : Boolean
})
mongoose.model( 'c_push', c_push );
