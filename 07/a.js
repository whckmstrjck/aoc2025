const fs = require('fs');
const input = fs.readFileSync('input.txt', 'utf8').split('\n');

let beamSplits = 0;
const beamIndexes = new Set();
beamIndexes.add(input[0].indexOf('S'));

for (let y = 1; y < input.length; y++) {
  for (let x = 0; x < input[y].length; x++) {
    const cell = input[y][x];
    if (cell === '^' && beamIndexes.has(x)) {
      beamSplits++;
      beamIndexes.delete(x);
      beamIndexes.add(x - 1);
      beamIndexes.add(x + 1);
    }
  }
}

console.log('⚡️ BEAM SPLITS:', beamSplits);
