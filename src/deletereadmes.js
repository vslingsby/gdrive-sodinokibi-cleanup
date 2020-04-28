const {google} = require('googleapis');
asyncForEach = require('./asyncforeach.js');
deleteFile = require('./deletefile.js');

async function deleteReadmes(drive, string) {
  let fileList = [];
  fileList = await getReadmes(drive, string);
  console.log(`${fileList.length} readmes found`)
  if (fileList && fileList.length > 0) {
    await asyncForEach(fileList, async (file) => {
      console.log(`Deleting ${file.name} ${file.id}`);
      deleteFile(drive, file.id);
    });
    return false;
  } else {
    console.log('Readmes done!');
    return true; //done
  }
}

async function getReadmes(drive, string) { //"modifiedTime": "2020-04-14T12:40:59.000Z"
  let fileList = [];
  const res =  await drive.files.list({
    q: `name contains '${string}-readme.txt' and trashed = false`,
    pageSize: 3
  });
  const files = res.data.files;
  if (files.length) {
    files.forEach( file => {
      fileList.push(file);
      });
    }
    return fileList;
}

module.exports = deleteReadmes;
