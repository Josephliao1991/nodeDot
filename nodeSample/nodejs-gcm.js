// var http = require('http');
//
// http.createServer(function (req,res) {
//      res.writeHead(200,{'Content-Type': 'text/plain'});
//
//   var GCM = require('./gcmnew');
//
//   var gcm = new GCM('AIzaSyDF0AW6fgIqLnLdH_yPYPvfsKuI_BwQycI'); // https://code.google.com/apis/console
//
//   // create the message
//   var msg = {
//     registration_ids: ['doX9i93g9BM:APA91bF0wohELmW-ZgisUWEd9eaNqRX_tmBUSPnqOC6u2cb1kxJC7UhhYN3NKORx9WubhL_8mjF8FfLzbbs4Rci4fVT5Xdzmd_U_U0CksSdxQji4UtL-k6CWSqCou7NGnXHYGaUIBZtu'],
//     collapse_key: "0002dsaa", // http://developer.android.com/guide/google/gcm/gcm.html#send-msg
//     time_to_live: 180, // just 30 minutes
//     data: {
//       SubTitle: "Hello",
//       Message: "fuck you gcm!" // your payload data
//     }
//   };
//
//   // send the message and see what happened
//   gcm.send(msg, function(err, response) {
//     // that error is from the http request, not gcm callback
//     console.log(response); // http://developer.android.com/guide/google/gcm/gcm.html#response
//   });
//      res.end('Hello World');
// }).listen(8124);
// console.log('Server is running at http://192.168.1.167:8124/');

function sendAndroidPush(deviceToken,badgeNumber, situation, name, macAddr) {
  // body...
  var GCM = require('./gcmnew');
  // var gcm = new GCM('AIzaSyDF0AW6fgIqLnLdH_yPYPvfsKuI_BwQycI'); // https://code.google.com/apis/console //My
  var gcm = new GCM('AIzaSyAs_RofE7utmeE9nLCpwX8qQmC2Jbvr3HU'); // https://code.google.com/apis/console

  // create the message
  var msg = {
    // registration_ids: ['fy3VUb_Dorc:APA91bG08EPmMW1eKAKLB5jiae0epCFyQjo1PiPEKio9r0PNlo7r1T57DB9a96m693Z5NUqwiZJyCdTIH_MJwygfZD355TuUoqtpptf5SwQIcxmix7ZE4QW1dsHtnqhi6VPM0DuAA9pL'],
    registration_ids: ['APA91bGDUiuEqcHck166Qh_yF9gXpzWlosMgfL9Q8lae1MLEb8ar0XdwrgJBDDKaXkxpWqEZf53SiGk7cQbri3dfoaOK76N2lk-9S1PabOn6JAc_dnAJwHvmfChOWu7V3af2GXEnJNcHSYau2H9BWucoZU7VcT62_Q'],
    // registration_ids: [deviceToken],
    collapse_key: "0002dsaa", // http://developer.android.com/guide/google/gcm/gcm.html#send-msg
    time_to_live: 180, // just 30 minutes
    data: {
      title       : "iNeDot",
      message     : "Emergency From " + name, // your payload data
      situation   : situation,
      name        : name,
      macAddr     : macAddr,
      badgeNumber : badgeNumber
    }
  };

  // send the message and see what happened
  gcm.send(msg, function(err, response) {
    // that error is from the http request, not gcm callback
    console.log(response); // http://developer.android.com/guide/google/gcm/gcm.html#response
  });


}

module.exports = {

  sendAndroidPush   : sendAndroidPush

}




/*
  var GCM = require('gcm').GCM;

  var apiKey = 'AIzaSyC7X3T-P-7dTs4QujGA3Gg8FxQpp4pBssg';
  var gcm = new GCM(apiKey);

  var message = {
      registration_id: 'APA91bF8LzoiMaeQ_rof9w2Hxo0k1VqSdUSSBYxsobSWvK8MvijJTL0JjppjOM0cdHkZkTMCFhLGQjru3ZACqsSgZHo7nBUjz_xyPT9UKixAVNOPMbdUxOnDX4tmi19EaoJQ_kgxz24qaA_aAAxoDGelp3rkCS79_g', // required
      collapse_key: 'aaaa',
      time_to_live: 180,
      data: {
          message: "fuck" // your payload data
        }
  };



  gcm.send(message, function(err, messageId){
      if (err) {
          console.log("Something has gone wrong!");
      } else {
          console.log("Sent with message ID: ", messageId);
      }
  });

*/
