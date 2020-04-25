const {google} = require('googleapis');

async function updateFileName(drive, fileId, fixedName) {
  const res = await drive.files.update({
    fileId: fileId,
    requestBody: {
      name: fixedName
    }
  });
}

module.exports = updateFileName;
