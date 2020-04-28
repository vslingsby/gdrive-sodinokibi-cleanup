/*
async function deleteFile(drive, fileId) {
  const res = await drive.files.delete({
    fileId: fileId,
  });
}
*/
async function deleteFile(drive, fileId) {
  const res = await drive.files.update({
    fileId: fileId,
    requestBody: {
      modifiedtime: Date.now(),
      trashed: true
    }
  });
}

module.exports = deleteFile;
