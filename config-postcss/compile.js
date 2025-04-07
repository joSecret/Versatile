const chalk = require('chalk');
const log = require('./log');
const fs = require('fs');
const path = require('path');
const postcssMixins = require('postcss-mixins');
const postcssNested = require('postcss-nested');
const postcssAdvancedVariables = require('postcss-advanced-variables');
const postcss = require('postcss');
const postcssCalc = require("postcss-calc");
const postcssImport = require('postcss-import');
const postcssUrl = require('postcss-url');
const postcssPresetEnv = require('postcss-preset-env');
// cspell:ignore pxtorem
const postcssPixelsToRem = require('postcss-pxtorem');
const cssnano = require('cssnano');
const postcssEach = require('postcss-each');

module.exports = (filePath, callback) => {
  // Transform the file.
  fs.readFile(filePath, (err, css) => {
    postcss([
      postcssImport(),
      postcssMixins(),
      postcssNested,
      postcssAdvancedVariables,
      postcssPresetEnv({
        stage: 1,
        preserve: false,
        autoprefixer: {
          cascade: false,
          grid: 'no-autoplace',
        },
        importFrom: {
          customMedia: {
            '--sm': '(min-width: 576px)',
            '--md': '(min-width: 768px)',
            '--downLg': '(max-width: 991px)',
            '--lg': '(min-width: 992px)',
            '--xl': '(min-width: 1200px)',
            '--xxl': '(min-width: 1400px)',
            '--switchDown': '(max-width: 991px)',
            '--switchUp': '(min-width: 992px)',
          }
        },
        features: {
          'custom-properties': false,
          'blank-pseudo-class': false,
          'focus-visible-pseudo-class': false,
          'focus-within-pseudo-class': false,
          'has-pseudo-class': false,
          'image-set-function': false,
          'prefers-color-scheme-query': false,
          'logical-properties-and-values': false,
          'cascade-layers': false,
        }
      }),
      postcssCalc,
      postcssEach,
      postcssPixelsToRem({
          propList: [
            '*',
            '!background-position',
            '!border',
            '!border-width',
            '!box-shadow',
            '!border-top*',
            '!border-right*',
            '!border-bottom*',
            '!border-left*',
            '!border-start*',
            '!border-end*',
            '!outline*',
          ],
          mediaQuery: true,
          minPixelValue: 3,
      }),
      postcssUrl({
        filter: '**/*.svg',
        url: 'inline',
        optimizeSvgEncode: true,
      }),
      cssnano()
    ])
    .process(css, { from: filePath })
    .then(result => {
      callback(result.css);
    })
    .catch(error => {
      log(chalk.red(error));
      process.exitCode = 1;
    });
  });
};
