
var gcm = require('node-gcm');

var message = new gcm.Message();

message.addData('key1', 'msg1');

var regIds = ['APA91bHS8TRLlCPHnd7TFJOPxKp5IVkWbuUZQYvs3pxAmi9IEYUWvyy1LMrd8JdSC3w3hhgIRzhwMZ4RhB8cevYODv3T7lgsDspiYkH16NQpwo9MTgyIH8ggh7-SrSYgHLuA2Y7egxQqety0nMbUKUoEFDA3uxqWRg'];

var sender = new gcm.Sender('AIzaSyBMwGObcYUITsJDT3wmYI5R_iMYMg4SI8c');

sender.send(message, regIds, function (err, result) {
    if(err) console.error(err);
    else    console.log(result);
});


