const fs = require('fs');
const { promisify } = require('util');

const readFileAsync = promisify(fs.readFile);

function readFileAsJson(filePath) {
  return readFileAsync(filePath, { encoding: 'utf8' })
    .then(data => JSON.parse(data))
    .catch(err => err);
}

module.exports = { readFileAsJson };
