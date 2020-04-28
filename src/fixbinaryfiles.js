const {google} = require('googleapis');
asyncForEach = require('./asyncforeach.js');
updateFileName = require('./updatefilename.js');
deleteRevision = require('./deleterevision.js');

async function fixBinaryFiles(drive, string) {
  let fileList = [];
  fileList = await getBinaryFiles(drive, string);
  console.log(`${fileList.length} bad Binary Files found`)
  if (fileList && fileList.length > 0) {
    await asyncForEach(fileList, async (file) => {

      let revision = await getBadRevision(drive, file.id);
      if (revision && revision == file.headRevisionId) {
        console.log(`Deleting ${file.name} revision ${revision}`)
        deleteRevision(drive, file.id, revision);
      } else console.log(`No revision for ${file.name}, skipping`);
      let fixedName = file.name.replace('.' + string, '');
      console.log("Updating " + file.name + ' --> ' + fixedName);
      updateFileName(drive, file.id, fixedName);
    });
    return false;
  } else {
    console.log('Binaries done!');
    return true; //done
  }
}

async function getBinaryFiles(drive, string) { //"modifiedTime": "2020-04-14T12:40:59.000Z"
  let fileList = [];
  const res =  await drive.files.list({
    q: `name contains '.${string}'
    and not name contains '${string}-readme' and trashed = false and fileExtension = '32ry'`,
    fields: `files(id,name,headRevisionId)`,
    pageSize: 10
  });
  const files = res.data.files;
  if (files.length) {
    files.forEach( file => {
      fileList.push(file);
      });
    }
    return fileList;
}

async function getBadRevision(drive, fileId) {
  const res = await drive.revisions.list({
    fileId: fileId
  });
  const revisions = res.data.revisions;
  if (revisions.length) {
    let badRevision = '';
    let startDate = new Date("2020-04-14");
    let endDate = new Date("2020-04-16");
    await asyncForEach(revisions, rev => {
      let date = new Date(rev.modifiedTime);
      if (date > startDate && date < endDate) {
        console.log(`Found bad revision`);
        badRevision = rev.id;
      }
    });
    return badRevision;
  }
}

module.exports = fixBinaryFiles;
