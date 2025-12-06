const fs = require('fs');

const input = fs.readFileSync('input.txt', 'utf8');
const [inputRanges] = input.split('\n\n');

const freshRanges = inputRanges
  .split('\n')
  .map((rangeStr) => {
    const range = rangeStr.split('-').map(Number);
    return [Math.min(range[0], range[1]), Math.max(range[0], range[1])];
  })
  .sort((a, b) => a[0] - b[0]);

function mergeRanges(ranges) {
  const mergedRanges = [ranges[0]];

  for (i = 1; i < ranges.length; i++) {
    const currentRange = ranges[i];
    const currentMergedRange = mergedRanges[mergedRanges.length - 1];

    if (currentRange[0] <= currentMergedRange[1]) {
      currentMergedRange[1] = Math.max(currentMergedRange[1], currentRange[1]);
    } else if (currentRange[0] > currentMergedRange[1]) {
      mergedRanges.push(currentRange);
    }
  }

  return mergedRanges;
}

const mergedFreshRanges = mergeRanges(freshRanges);
const freshIngredientCount = mergedFreshRanges.reduce((sum, [min, max]) => max - min + 1 + sum, 0);

console.log('🥦 FRESH INGREDIENTS IN REGISTRY:', freshIngredientCount);
