/**
 * @file
 */

'use strict';

const glob = require('glob');
const fse = require('fs-extra');
const fs = require('fs');
const postcss = require('postcss');
const replaceString = require("postcss-replace-string");
const cssNano = require('cssnano');

// Match only on .pcss.css files.
const fileMatch = './fonts/*.css';
// Ignore everything in node_modules
const globOptions = {
  ignore: './node_modules/**'
};

const postcssWork = (filePath, callback) => {
  fs.readFile(filePath, (err, css) => {
    postcss([
      replaceString ({
        replacePairs: [
          {
            source: ":before",
            target: ""
          },
          {
              source: "content",
              target: "--icon"
          }
        ]
      })
      // cssNano()
    ])
    .process(css, { from: filePath })
    .then(result => {
      callback(result.css);
    })
    .catch(error => {
      console.log(chalk.red(error));
      process.exitCode = 1;
    });
  });
};

const processFiles = (error, filePaths) => {
  if (error) {
    process.exitCode = 1;
  }

  filePaths.forEach(test);
};

const test = (filePath) => {
  console.log(`'${filePath}' is being processed.`);

  // Transform the file.
  postcssWork(filePath, function write(code) {
    fse.outputFile(filePath, code)
    .then(() => {
        console.log(`'${filePath}' is finished.`);
      });
  });
}

glob(fileMatch, globOptions, processFiles);
process.exitCode = 0;
