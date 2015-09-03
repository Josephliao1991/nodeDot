
var apns = require('apn');

function sendiOSPush(deviceToken, badgeNumber, situation, name, macAddr) {
  // body...
  var options = {
      cert: 'aps_development.pem',                 /* Certificate file path */
      key:  'apns_dev_key.pem',                  /* Key file path */
      gateway: 'gateway.sandbox.push.apple.com',/* gateway address */
      port: 2195,                       /* gateway port */
      errorCallback: errorHappened ,    /* Callback when error occurs function(err,notification) */
  };
  function errorHappened(err, notification){
      console.log("err " + err);
  }
  var apnsConnection = new apns.Connection(options);

  var token = deviceToken
  // var token = "23985a90d260d1d6a2cb5670714d1f79025a1c44f7f8aab3f991e4a67f08e353";

  var myDevice = new apns.Device(token);
  var note = new apns.Notification();
  note.expiry = Math.floor(Date.now() / 1000) + 3600; // Expires 1 hour from now.
  note.badge = badgeNumber;
  note.sound = "ping.aiff";
  note.alert = "Emergency From "+name
  note.payload = {"messageFrom": "iNedotServer",
                  "situation"  : situation,
                  "name"       : name,
                  "macAddr"    : macAddr};

  note.device = myDevice;

  apnsConnection.sendNotification(note);
}


module.exports = {

  sendiOSPush    : sendiOSPush

}
