const {google} = require('googleapis');

fixGoogleDocs = require('./fixgoogledocs.js');
fixBinaryFiles = require('./fixbinaryfiles.js');
deleteReadmes = require('./deletereadmes.js')

async function fixGoogleDrive(auth, encryptString) {
  const drive = google.drive({version: 'v3', auth});
  let gdocsDone = false;
  let binaryDone = false;
  let readmesDone = false;
  while (gdocsDone != true || binaryDone != true || readmesDone != true) {
    if (readmesDone != true) {
      readmesDone = await deleteReadmes(drive, encryptString);
    }
    if (gdocsDone != true) {
      gdocsDone = await fixGoogleDocs(drive);
    }
    if (binaryDone != true) {
      binaryDone = await fixBinaryFiles(drive,encryptString);
    }
    await sleep(10000);
  }
  console.log('Done!');
}

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

module.exports = fixGoogleDrive;
