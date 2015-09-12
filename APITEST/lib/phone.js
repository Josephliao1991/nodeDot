require('./dbModel');
var mongoose = require('mongoose');
var Phone    = mongoose.model('phone')

function create(name, number, callback) {
  // body...
  Phone.create({
    name    : name,
    number  : number
  },function (error, phone) {
    // body...
    if (error) {
      console.log("ERROR: "+error);
      return callback(error)
    }

    callback(null,phone)
    // res.send("PHONE: "+phone)
    // res.json(phone)
  })
}

function find(name, callback) {
  // body...
  Phone.find({name : name}, function (error, phones) {
    // body...
    if (error) {
      return callback(error)
    }

    callback(null,phones)

  })
}

module.exports = {

  create : create,
  find   : find

}
