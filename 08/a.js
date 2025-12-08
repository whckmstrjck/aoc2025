const fs = require('fs');
const input = fs.readFileSync('test-input.txt', 'utf8');

class JunctionBox {
  x = 0;
  y = 0;
  z = 0;

  closestDistance = Infinity;

  constructor(coordsStr) {
    [this.x, this.y, this.z] = coordsStr.split(',').map(Number);
  }

  getDistance = (otherBox) =>
    Math.sqrt(Math.pow(otherBox.x - this.x, 2) + Math.pow(otherBox.y - this.y, 2) + Math.pow(otherBox.z - this.z, 2));
}
class JunctionBoxList {
  searchDistance = 15000;
  items = null;
  closestDistanceMap = new Map();

  constructor(coordinateData) {
    this.items = coordinateData.split('\n').map((coordsStr) => new JunctionBox(coordsStr));
  }

  measureDistances() {
    for (const box of this.items) {
      const closestBoxes = this.getClosestBoxes(box);

      let closestDistance = Infinity;
      let closestBox = null;

      for (const otherBox of closestBoxes) {
        const distance = box.getDistance(otherBox);

        if (distance < closestDistance) {
          closestDistance = distance;
          closestBox = otherBox;
        }
      }

      box.closestDistance = closestDistance;
      this.closestDistanceMap.set(box, closestBox);
    }
  }

  getClosestBoxes(box) {
    return this.items.filter((otherBox) => {
      if (otherBox === box) return false;

      return (
        box.x - this.searchDistance <= otherBox.x &&
        box.x + this.searchDistance >= otherBox.x &&
        box.y - this.searchDistance <= otherBox.y &&
        box.y + this.searchDistance >= otherBox.y &&
        box.z - this.searchDistance <= otherBox.z &&
        box.z + this.searchDistance >= otherBox.z
      );
    });
  }
}

const junctionBoxList = new JunctionBoxList(input);
junctionBoxList.measureDistances();

const boxesByDistance = [...junctionBoxList.items].sort((a, b) => a.closestDistance - b.closestDistance);
const circuits = [];

console.log(boxesByDistance[2]);
console.log(console.log(junctionBoxList.closestDistanceMap.get(boxesByDistance[2])));

let connectionsMade = 0;
while (connectionsMade < 11) {
  const currentBox = boxesByDistance[0];
  const closestBox = junctionBoxList.closestDistanceMap.get(currentBox);
}

const topThreeCircuits = circuits.sort((a, b) => b.length - a.length).slice(0, 3);
const circuitSum = topThreeCircuits.reduce((sum, circuit) => sum * circuit.length, 1);

console.log('⚡ SUM OF TOP THREE:', circuitSum);
