const fs = require('fs');

const input = fs.readFileSync('input.txt', 'utf8');
const batteryPacks = input.split('\n');

let joltageSum = 0;

function getHighestDigit(pack, isFirstDigit) {
  let highest = '1';

  for (i = 0; i < pack.length; i++) {
    const digit = pack[i];
    if (digit > highest && !(isFirstDigit && i === pack.length - 1)) {
      highest = digit;
    }
  }

  return highest;
}

function getHighestJoltage(pack) {
  const firstDigit = getHighestDigit(pack, true);

  const indexOfFirstDigit = pack.indexOf(firstDigit);
  const subPack = pack.slice(indexOfFirstDigit + 1);
  const secondDigit = getHighestDigit(subPack, false);

  return parseInt(firstDigit + secondDigit);
}

for (const pack of batteryPacks) {
  joltageSum += getHighestJoltage(pack);
}

console.log('⚡️ JOLTAGE SUM: ', joltageSum);
