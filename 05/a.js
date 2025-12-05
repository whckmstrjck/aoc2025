const fs = require('fs');

const input = fs.readFileSync('input.txt', 'utf8');
const [inputRanges, inputIds] = input.split('\n\n');

const freshRanges = inputRanges.split('\n').map((rangeStr) => {
  const range = rangeStr.split('-').map(Number);
  return [Math.min(range[0], range[1]), Math.max(range[0], range[1])];
});
const ingredientIds = inputIds.split('\n').map(Number);

let freshIngredientCount = 0;

for (const id of ingredientIds) {
  for (const [min, max] of freshRanges) {
    if (id >= min && id <= max) {
      freshIngredientCount++;
      break;
    }
  }
}

console.log('🥦 NUMBER OF FRESH INGREDIENTS:', freshIngredientCount);
