var http = require('http');
var express = require('express');
var bodyparser = require('body-parser');

var phone   = require('./router/phone');
var inedot  = require('./router/inedot');



// var server = http.createServer(function (req, res) {
//   // body...
//   res.end("Hello world!!")
//   // res.end();
//
// })
//
// server.listen(8080,function (error) {
//   // body...
//   if (error) {
//     console.log(error);
//   }
//
//   console.log("server is Start!,plz...enter Ctrl + C to stop server!!");
//
// });

var app = express()

app.use(bodyparser.json())
app.use(bodyparser.urlencoded({ extended: false}))
app.use(bodyparser.json({ type: 'application/vnd.api+json'}))



// app.get('/', function (req, res) {
//   // body...
//   res.send("Hello World,This is A-Liao's Server!!!!!")
// })
//
// app.get('/eat', function (req, res) {
//   // body...
//   var breakfast = req.query.breakfast
//   var lunch     = req.query.lunch
//   var dinner    = req.query.dinner
//   var times     = req.query.times
//   var cacul     = times*10;
//
//   if (!breakfast||!times) {
//     res.end("error")
//   }
//
//   res.send("times : "+cacul+"  Breakfast : "+breakfast + "  Lunch : "+lunch + "  Dinner : "+dinner)
//
// })


// app.post('/play',function (req, res) {
//   // body...
//   var ball = req.body.ball
//   res.send("You Choose : "+ball)
//
// })

// app.use('/phone',phone)
// app.use('/inedot',inedot)

app.listen(8080,function (error) {
  // body...
  if (error) {
    console.log(error);
  }

  console.log("Server is Start Now");

})
