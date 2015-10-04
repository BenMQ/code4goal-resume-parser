var path = require('path');
var SomeHR = require('./src/SomeHR')();
require('colors');

console.log('Please, wait 2 sec to skip warnings'.bgRed.black);
setTimeout(main, 2000);

function main() {
  var files = process.argv.slice(2);
  if (files.length === 0) {
    console.log("Usage: node parse.js [file ...]");
  } else {
    handleFile(files);
  }
 }

function handleFile(files, err) {
    var Iam = SomeHR,
      ParseBoy,
      savedFiles = 0;

    if (err) {
      return Iam.explainError(err);
    }
    if (!files.length) {
      return Iam.nothingToDo();
    }

    /** @type {ParseBoy} */
    ParseBoy = Iam.needSomeoneToSortCV();

    ParseBoy.willHelpWithPleasure(files, function (PreparedFile) {
      ParseBoy.workingHardOn(PreparedFile, function (Resume) {
        ParseBoy.storeResume(PreparedFile, Resume, __dirname + '/compiled', function (err) {
          if (err) {
            return ParseBoy.explainError(err);
          }

          savedFiles += 1;

          if (savedFiles == files.length) {
            console.log('Done');
          }
        })
      });
    });
  }