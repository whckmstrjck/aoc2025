var fs = require('fs');
var input = fs.readFileSync('input.txt', 'utf8').trim().split('\n');

const dialMin = 0;
const dialMax = 99;
let dial = 50;
let zeroCount = 0;

for (let line of input) {
  const dirSign = line[0] === 'L' ? -1 : 1;
  const value = parseInt(line.slice(1), 10);

  for (let i = 0; i < value; i++) {
    dial += dirSign;

    if (dial < dialMin) {
      dial = dialMax;
    } else if (dial > dialMax) {
      dial = dialMin;
    }

    if (dial === 0) {
      zeroCount += 1;
    }
  }
}

console.log(`Number of times dial hit zero: ${zeroCount}`);
