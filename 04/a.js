const fs = require('fs');

const input = fs.readFileSync('input.txt', 'utf8');
const rollGrid = input.split('\n').map((line) => line.split('').map((roll) => roll === '@'));

const colCount = rollGrid[0].length;
const rowCount = rollGrid.length;

function checkAdjacent(row, col) {
  let adjacentRolls = 0;

  for (let rowOffset = -1; rowOffset <= 1; rowOffset++) {
    for (let colOffset = -1; colOffset <= 1; colOffset++) {
      const checkRow = row + rowOffset;
      const checkCol = col + colOffset;

      const isActualRoll = rowOffset === 0 && colOffset === 0;
      const isOutOfBounds = checkRow < 0 || checkRow >= rowCount || checkCol < 0 || checkCol >= colCount;

      if (isActualRoll || isOutOfBounds) {
        continue;
      }

      if (rollGrid[checkRow][checkCol]) {
        adjacentRolls++;
      }
    }
  }

  return adjacentRolls <= 3;
}

let accessibleRollCount = 0;

for (let row = 0; row < rowCount; row++) {
  for (let col = 0; col < colCount; col++) {
    if (rollGrid[row][col] && checkAdjacent(row, col)) {
      accessibleRollCount++;
    }
  }
}

console.log('🧻 ACCESSIBLE ROLLS: ', accessibleRollCount);
