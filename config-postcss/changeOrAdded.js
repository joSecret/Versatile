const fse = require('fs-extra');
const log = require('./log');
const compile = require('./compile');

module.exports = (filePath) => {
  log(`'${filePath}' is being processed.`);

  // Transform the file.
  compile(filePath, function write(code) {
    if (!filePath.startsWith('./')) {
      filePath = './' + filePath;
    }

    // Ex file ./folder/folder/file-name.scss.css
    // Slice rome first symbols and last 9
    if (filePath.startsWith('./dev/pcss')) {
      var fileName = filePath.slice(10, -9);
    } else if (filePath.startsWith('./templates')) {
      var fileName = filePath.slice(11, -9);
    } else {
      var fileName = filePath.slice(0, -9);
    }

    console.log('fileName - ', fileName);
    // Add base folder
    let cssFilePath = '';

    if (filePath.startsWith('./dev/pcss') || filePath.startsWith('./templates')) {
      cssFilePath = 'css' + fileName + '.css';
    } else {
      cssFilePath = fileName + '.css';
    }

    console.log('cssFilePath - ', cssFilePath);

    fse.outputFile(cssFilePath, code)
      .then(() => {
        log(`'${filePath}' is finished.`);
      });
  });
};
