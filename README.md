# gdrive-sodinokibi-cleanup
This is a script written to clean up a Google Drive account that has been affected by the Sodinokibi/REvil ransomware due to changes pushed to the Google Drive account from a linked Google Backup & Sync.

This script does the following:
1. Deletes bad (encrypted) file revisions on a given date.
2. Reverts name changes made to files and GDocs items by Sodinokibi/REvil
3. Trashes readme files created by Sodinokibi/REvil

## Requirements
1. Node
2. NPM
3. Google Drive account

## Install
1. [Enable the Drive API and download the client configuration.](https://developers.google.com/drive/api/v3/quickstart/nodejs) Save the resulting `credentials.json` file to the repository root.
2. Run `npm install`

## Configuration
1. Set `ENCRYPT_STRING` in `index.js` to the identifier used by Sodinokibi/REvil
2. Set the date window in `/src/fixbinaryfiles.js` to match the timeframe of the Sondinokibi/REvil attack

## Usage
Start the script with `npm start`

## Todo
1. Conversion of major functions to classes
2. Unify configuration to one file
3. Error handling
4. Dynamic request throttling to stay just under Google Drive free quota limits
