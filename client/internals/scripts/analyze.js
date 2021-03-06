#!/usr/bin/env node

const shelljs = require('shelljs');
const chalk = require('chalk');
const animateProgress = require('./helpers/progress');
const addCheckMark = require('./helpers/checkmark');

const progress = animateProgress('Generating stats');

shelljs.exec(
  'webpack --config internals/webpack/webpack.prod.babel.js --profile --json > stats.json',
  addCheckMark.bind(null, callback),
);

/* eslint-disable prefer-template */
function callback() {
  clearInterval(progress);
  process.stdout.write(
    '\n\nOpen ' +
      chalk.magenta('http://webpack.github.io/analyse/') +
      ' in your browser and upload the stats.json file!' +
      chalk.blue(
        '\n(Tip: ' + chalk.italic('CMD + double-click') + ' the link!)\n\n',
      ),
  );
}
