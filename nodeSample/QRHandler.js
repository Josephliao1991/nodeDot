#!/usr/bin/env node

var fs = require('fs');
var qr = require('qr-image');

var fileDirect = './qrfile/'
function writeFile(name) {
    return fs.createWriteStream(fileDirect + name);
}

// var text = 'I \u2764\uFE0F QR code!';
// var text = 'https://yadi.sk/d/FuzPeEg-QyaZN?qr';
// qr.image("familyKey tesy", { type: 'png', ec_level: "H", parse_url: false, margin: 1}).pipe(writeFile('qr.png'));
// var image = fs.createReadStream(fileDirect + "qr.png");
// console.log(image);

function createqr(familyKey) {
  // body...
  var ec_level = 'H';
  var text     = familyKey
  console.log(familyKey);

  var image = qr.image(text, { type: 'png', ec_level: ec_level, parse_url: false, margin: 1})
  image.pipe(writeFile(familyKey+'.png'));
  return image

  // qr.image(text, { type: 'png', ec_level: ec_level_Q, parse_url: false, margin: 1}).pipe(file('qr_q.png'));
  // qr.image(text, { type: 'png', ec_level: ec_level, parse_url: true,  margin: 1}).pipe(file('qr_t.png'));
  // qr.image(text, { type: 'svg', ec_level: ec_level}).pipe(file('qr.svg'));
  // qr.image(text, { type: 'eps', ec_level: ec_level}).pipe(file('qr.eps'));
  // qr.image(text, { type: 'pdf', ec_level: ec_level}).pipe(file('qr.pdf'));

  // fs.writeFileSync('qr_sync.png', qr.imageSync(text));
}

function readqr(name) {
  // body...
  return fs.createReadStream(fileDirect + name);
}

module.exports = {
  createqr    : createqr,
  readqr      : readqr
}
