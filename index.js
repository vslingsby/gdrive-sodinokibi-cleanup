const fs = require('fs');

fixGoogleDrive = require('./src/fixgoogledrive.js');
authorize = require('./src/authorize.js');

const ENCRYPT_STRING = '32ry650';

fs.readFile('credentials.json', (err, content) => {
  if (err) return console.log('Error loading client secret file:', err);
  authorize(JSON.parse(content), ENCRYPT_STRING, fixGoogleDrive);
});
