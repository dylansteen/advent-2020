const util = require('util');
const fs = require('fs');
const readFile = util.promisify(fs.readFile);

function getMap() { 
  return readFile('input.txt', 'utf8').then((data) => data.split('\n').filter(line => !!line));
}

async function main() {
  const positionMap = await getMap();
  const maxX = positionMap[0].length;
  const slopes = [[1, 1], [3, 1], [5, 1], [7, 1], [1, 2]];

  const collisionsArr = slopes.map((slope) => {
    let xPos = 0;
    const resultingMap = positionMap.filter((row, index) => !(index % slope[1]));
    const deltaX = slope[0];

    const collisions = resultingMap.reduce((acc, row) => {
      const result = hasCollision(xPos, row) ? acc + 1 : acc;
      xPos = move(xPos, deltaX, maxX);
      return result;
    }, 0);

    return collisions;
  });
  
  console.log(collisionsArr.reduce((acc, curr) => acc * curr));
}

const move = (previous, x, maxX) => (previous + x) % maxX;
const hasCollision = (xPos, row) => row[xPos] === '#';

main();
