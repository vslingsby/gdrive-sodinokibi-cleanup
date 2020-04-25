const {google} = require('googleapis');
updateFileName = require('./updatefilename.js');

async function fixGoogleDocs(drive) {
  let fileList = [];
  let done = false;
  fileList = await getBadGoogleDocs(drive);
  console.log(`${fileList.length} Bad Google Docs found`);
  fileList.forEach( file => {
    let regex = /(\.gdoc)$|(\.gslides)$|(\.gsheet)$/
    let fixedName = file.name.replace(regex, '');
    console.log("Updating " + file.name + ' --> ' + fixedName);
    updateFileName(drive, file.id, fixedName);
  });
}

async function getBadGoogleDocs(drive) {
  const res = await drive.files.list({
    q: "name contains '.gdoc' or name contains '.gsheet' or name contains '.gslides'",
    pageSize: 20
  });
  if (res.data) {
    const files = res.data.files;
    if (files) {
      return files;
    }
  }
}

module.exports = fixGoogleDocs;
