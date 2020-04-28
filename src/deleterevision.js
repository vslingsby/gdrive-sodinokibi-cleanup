async function deleteRevision(drive, fileId, revisionId) {
  const res = await drive.revisions.delete({
    fileId: fileId,
    revisionId: revisionId
  });
}

module.exports = deleteRevision;
