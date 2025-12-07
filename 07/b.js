const fs = require('fs');
const input = fs.readFileSync('input.txt', 'utf8').split('\n');

const result = input.map((row) => row.split('').map(() => 0));

for (let y = 0; y < input.length; y++) {
  const line = input[y];

  for (let x = 0; x < line.length; x++) {
    const currentChar = line[x];

    if (currentChar === 'S') {
      result[y][x] = 1;
      continue;
    }

    if (currentChar === '^') {
      result[y][x - 1] += result[y - 1][x];
      result[y][x] = '^';
      result[y][x + 1] += result[y - 1][x];
      continue;
    }

    if (!result[y - 1] || result[y - 1]?.[x] === '^') continue;

    result[y][x] += result[y - 1][x];
  }
}

const possibleTimelines = result.at(-1).reduce((sum, timelineCount) => sum + timelineCount, 0);

console.log('🕰️ POSSIBLE TIMELINES:', possibleTimelines);
