import * as fs from 'fs';
import { promisify } from 'util';

const readFileAsync = promisify(fs.readFile);

export function readFileAsJson(filePath: string) {
  return readFileAsync(filePath, { encoding: 'utf8' })
    .then(data => JSON.parse(data))
    .catch(err => err);
}
