var mongoose = require('mongoose');

//add at api layer
// //Connect To Mongodb
// var be_ip   = "10.240.72.88:80"
// var dbName  = "myDatabase"
// mongoose.connect('mongodb://'+be_ip+dbName)


//Set Data Model
var Schema   = mongoose.Schema;


var group = new Schema({
  name    : String,
  leader  : String, //SSID
  member  : Array,  //[SSID, SSID, SSID,,,]
  listenDevice  : Array,  //[macAddr, macAddr, macAddr,,,]
  date    : Date
});
mongoose.model( 'group', group );



var person  = new Schema({
  ssid      : String, *//SSID
  pwd       : String, //PASSWORD
  phone     : Array,  //[deviceToken, deviceToken,,,]

  selfGroup : Array,  //[_id, _id, _id,,,]
  joinGroup : Array,  //[_id, _id, _id,,,]

  center    : Array,  //[macAddr, macAddr, macAddr,,,]
  inedot    : Array,  //[macAddr, macAddr, macAddr,,,]

  authData  : Array   //[_id, _id, _id,,,]
})
mongoose.model( 'person', person );



var center  = new Schema({
  macAddr           : String,   //macAddr
  owner             : String,   //deviceToken
  connectState      : Boolean,  //state True/False
  // deviceList        : Array,    //[macAddr, macAddr, macAddr,,,]
  connectingDevice  : Array,    //[macAddr, macAddr, macAddr,,,]
})
mongoose.model( 'center', center );



var inedot  = new Schema({
  macAddr        : String, //macAddr
  owner          : String, //deviceToken
  connectState   : Boolean
  name           : String,
  battery        : Number,

  pushGroup      : Array,  //[_id, _id, _id,,,]
  pushPoeple     : Array,  //[deviceToken, deviceToken,,,]

  situation      : Array,
  /*
  {
    type    : 1 //mornitor
    function :{ //add in function if it is on
        alert : 0,  // 0/1/2; weak/normal/strong
        temp  : 50, // emergency temperature
        humi  : 0,  // emergency humidtity
        baby  : 1,  // just put 1
        area  : 1,  // just put 1
        mesg  : "Message for family..." //  put the message...
    }
  }

  {
    type    : 0 //normal
    function :{ //add in function if it is on
        sport : 1,
        pet   : 1,
        find  : 1,
        drop  : 1
    }
  }

  */
})
mongoose.model( 'inedot', inedot );



var c_push  = new Schema({
  owner             : String,
  center_macAddr    : String,
  inedot_macAddr    : String,
  command           : Number, // 0/1/2; disconnect /connect&setting /deleteFromList
  checkMark         : Boolean
})
mongoose.model( 'c_push', c_push );
