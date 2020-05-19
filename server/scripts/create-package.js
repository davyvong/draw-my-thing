const fs = require('fs');
const pkg = require('../package.json');

fs.writeFileSync(
  process.cwd() + '/dist/package.json',
  JSON.stringify({ dependencies: pkg.dependencies }, null, 2)
);

fs.copyFileSync(
  process.cwd() + '/yarn.lock',
  process.cwd() + '/dist/yarn.lock',
);