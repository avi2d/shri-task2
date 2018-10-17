const fs = require('fs');

function readFileAsJson(filePath) {
  const fileString = fs.readFileSync(filePath, 'utf8');

  return JSON.parse(fileString);
}

module.exports = { readFileAsJson };
