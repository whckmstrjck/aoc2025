var fs = require('fs');
var input = fs.readFileSync('input.txt', 'utf8').trim().split('\n');

let dial = 50;
let dialMax = 99;
let zeroCount = 0;

for (let line of input) {
  const dir = line[0] === 'L' ? -1 : 1;

  const value = parseInt(line.slice(1), 10);

  dial = (((dial + value * dir) % (dialMax + 1)) + (dialMax + 1)) % (dialMax + 1);

  if (dial === 0) {
    zeroCount += 1;
  }
}

console.log(`Final dial position: ${dial}`);
console.log(`Number of times dial hit zero: ${zeroCount}`);
