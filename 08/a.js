const fs = require('fs');
const input = fs.readFileSync('test-input.txt', 'utf8');

class JunctionBox {
  x = 0;
  y = 0;
  z = 0;

  constructor(coords) {
    [this.x, this.y, this.z] = coords.split(',').map(Number);
  }

  getDistance = (otherBox) =>
    Math.sqrt(Math.pow(otherBox.x - this.x, 2) + Math.pow(otherBox.y - this.y, 2) + Math.pow(otherBox.z - this.z, 2));
}

const disconnectedBoxes = input.split('\n').map((boxStr) => new JunctionBox(boxStr));
const circuits = [];

for (let circuitCount = 0; circuitCount < 3; circuitCount++) {
  const currentBox = disconnectedBoxes[0];

  let shortestDistance = Infinity;
  let closestCircuit = null;
  let closestBox = null;

  for (let i = 0; i < circuits.length; i++) {
    const circuit = circuits[i];
    for (let j = 0; j < circuit.length; j++) {
      const otherBox = circuit[j];
      const distance = currentBox.getDistance(otherBox);

      if (distance < shortestDistance) {
        shortestDistance = distance;
        closestBox = otherBox;
        closestCircuit = circuit;
      }
    }
  }

  for (let i = 1; i < disconnectedBoxes.length; i++) {
    const otherBox = disconnectedBoxes[i];
    const distance = currentBox.getDistance(otherBox);

    if (distance < shortestDistance) {
      shortestDistance = distance;
      closestBox = otherBox;
      closestCircuit = null;
    }
  }

  if (!closestCircuit) {
    circuits.push([currentBox, closestBox]);
  } else {
    closestCircuit.push(currentBox);
  }

  disconnectedBoxes.splice(disconnectedBoxes.indexOf(currentBox), 1);

  console.log(circuits);
}

console.log(circuits.map((circuit) => circuit.length));
