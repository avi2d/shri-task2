const { resolve } = require('path');
const svgstore = require('svgstore');
const fs = require('fs');

const svgDir = resolve(__dirname, 'source/assets/svg');

const svgoOptions = {
  copyAttrs: ['fill']
};
const sprite = svgstore(svgoOptions);

fs.readdirSync(svgDir).forEach(fileName => {
  sprite.add(fileName.split('.')[0], fs.readFileSync(`${svgDir}/${fileName}`));
});

fs.writeFileSync(`${svgDir}/sprite.svg`, sprite);
