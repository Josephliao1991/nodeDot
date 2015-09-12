var express = require('express');
var mongoose = require('mongoose');

var app =express();

mongoose.connect('mongodb://10.240.42.213:27017/myDatabase')

var Schema = mongoose.Schema;
var phone  = new Schema({

  name    : String,
  number  : String

})

mongoose.model( 'phone', phone );


var Phone  = mongoose.model('phone')

app.get('/phoneCreate',function (req, res) {
  // body...
  Phone.create({
    name    : "Shit Man",
    number  : "0800-092-000"
  },function (error, phone) {
    // body...
    if (error) {
      console.log("ERROR: "+error);
      return res.send(error)
    }

    res.send("PHONE: "+phone)
    // res.json(phone)
  })
})

app.listen(80,function (error) {
  // body...
  if (error) {
    return console.log("ERROR: "+error);
  }

  console.log("Server Is Start, Enter CTRL + C Twice To Stop!!");

})
