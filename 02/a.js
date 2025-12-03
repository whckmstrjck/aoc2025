const fs = require('fs');

const input = fs.readFileSync('input.txt', 'utf-8');

const rangeList = input
  .replaceAll('\n', '')
  .split(',')
  .map((rangeStr) => rangeStr.split('-').map(Number));

function isInvalidNumber(num) {
  const numStr = `${num}`;
  if (numStr.length % 2 !== 0) return false;

  const firstHalf = numStr.slice(0, numStr.length / 2);
  const secondHalf = numStr.slice(numStr.length / 2);

  return firstHalf === secondHalf;
}

let sum = 0;

for (const [rangeA, rangeB] of rangeList) {
  for (let i = rangeA; i <= rangeB; i++) {
    if (isInvalidNumber(i)) {
      sum += i;
    }
  }
}

console.log('SUM:', sum);
