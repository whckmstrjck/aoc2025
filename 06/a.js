const fs = require('fs');
const input = fs.readFileSync('input.txt', 'utf8');
const inputGrid = input.split('\n').map((line) => line.trim().replace(/\s+/g, ' ').split(' '));

let done = false;
let column = 0;
const problems = [];

while (!done) {
  for (let row = 0; row < inputGrid.length; row++) {
    if (inputGrid[row][column] === undefined) {
      done = true;
      break;
    }

    problems[column] = problems[column] ?? [];
    problems[column].push(inputGrid[row][column]);
  }
  column++;
}

const grandTotal = problems.reduce((acc, problem) => {
  const operator = problem.pop();

  return (
    problem.reduce(
      (total, numberStr) => {
        if (operator === '+') {
          return total + Number(numberStr);
        } else {
          return total * Number(numberStr);
        }
      },
      operator === '*' ? 1 : 0
    ) + acc
  );
}, 0);

console.log('🧮 GRAND TOTAL:', grandTotal);
