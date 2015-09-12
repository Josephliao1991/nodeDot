var express = require('express');
var mongoose = require('mongoose');
var phone = require('./lib/phone');
var app =express();

mongoose.connect('mongodb://10.240.42.213:27017/myDatabase')

app.get('/phoneCreate',function (req, res) {
  // body...
  var name_create = req.query.name
  var number_create = req.query.number

  if (!name_create || !number_create) {
    return res.send("Fail,Lost Some Params...")
  }

  phone.create(name_create, number_create, function (error, phones) {
    // body...
    if (error) {
      return res.send(error)
    }

    res.json(phones)

  })

})


app.get('/phoneFind',function (req, res) {
  // body...
  var name_create = req.query.name

  if (!name_create) {
    return res.send("Fail,Lost Some Params...")
  }

  phone.find(name, function (error, phones) {
    // body...
    if (error) {
      return res.send(error)
    }
    res.json(phones)
  })
})


app.listen(80,function (error) {
  // body...
  if (error) {
    return console.log("ERROR: "+error);
  }

  console.log("Server Is Start, Enter CTRL + C Twice To Stop!!");

})
