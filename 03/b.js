const fs = require('fs');

const input = fs.readFileSync('input.txt', 'utf8');
const batteryPacks = input.split('\n');

function getHighestDigitInPack(pack, remainingDigits) {
  let highestDigit = '1';

  for (i = 0; i < pack.length; i++) {
    const digit = pack[i];
    if (digit > highestDigit && i < pack.length - remainingDigits) {
      highestDigit = digit;
    }
  }

  return highestDigit;
}

function getHighestJoltageInPack(pack) {
  let digits = '';

  for (let i = 0; i <= 11; i++) {
    const highestDigitInPack = getHighestDigitInPack(pack, 11 - i);
    digits += highestDigitInPack;
    pack = pack.slice(pack.indexOf(highestDigitInPack) + 1);
  }

  return Number(digits);
}

let joltageSum = 0;
for (const pack of batteryPacks) {
  joltageSum += getHighestJoltageInPack(pack);
}

console.log('⚡️ JOLTAGE SUM: ', joltageSum);
