const fs = require('fs');

const input = fs.readFileSync('input.txt', 'utf-8');

const rangeList = input
  .replaceAll('\n', '')
  .split(',')
  .map((rangeStr) => rangeStr.split('-').map(Number));

function isInvalidNumber(num) {
  const numStr = `${num}`;
  const numLen = numStr.length;

  let invalid = false;
  for (let i = 1; i <= numLen; i++) {
    if (i === numLen || numLen % i !== 0) continue;

    const digits = numStr.split('');
    const chunks = [];

    while (digits.length) {
      chunks.unshift(digits.splice(-i).join(''));
    }

    if (chunks.every((chunk) => chunk === chunks[0])) {
      invalid = true;
      break;
    }
  }

  return invalid;
}

let sum = 0;

for (const [rangeA, rangeB] of rangeList) {
  for (let i = rangeA; i <= rangeB; i++) {
    if (isInvalidNumber(i)) {
      sum += i;
    }
  }
}

console.log('SUM: ', sum);
