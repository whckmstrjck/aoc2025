const fs = require('fs');
const input = fs.readFileSync('input.txt', 'utf8').split('\n');

let done = false;
let column = 0;
let problemIndex = 0;
const problems = [];

while (!done) {
  if (problems[problemIndex] === undefined) {
    problems[problemIndex] = {
      operator: undefined,
      numbers: [],
    };
  }

  const currentProblem = problems[problemIndex];
  let allSpaces = true;

  for (let row = 0; row < input.length; row++) {
    if (row === input.length - 1) {
      currentProblem.operator = currentProblem.operator ?? input[row][column];
      continue;
    }

    if (input[row][column] !== ' ') {
      allSpaces = false;
      currentProblem.numbers[column] = currentProblem.numbers[column] || '';
      currentProblem.numbers[column] += input[row][column];
    }
  }

  if (allSpaces || input[0][column + 1] === undefined) {
    currentProblem.numbers = currentProblem.numbers.map(Number).filter(Boolean);
    problemIndex++;
  }

  if (input[0][column + 1] === undefined) {
    done = true;
    break;
  }

  column++;
}

const grandTotal = problems.reduce((grandTotal, problem) => {
  const problemTotal = problem.numbers.reduce(
    (acc, num) => (problem.operator === '*' ? acc * num : acc + num),
    problem.operator === '*' ? 1 : 0
  );

  return grandTotal + problemTotal;
}, 0);

console.log('🧮 GRAND TOTAL:', grandTotal);
