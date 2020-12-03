const util = require('util');
const fs = require('fs');
const readFile = util.promisify(fs.readFile);

function getMap() { 
  return readFile('input.txt', 'utf8').then((data) => data.split('\n').filter(line => !!line));
}

async function main() {
  const positionMap = await getMap();
  const maxX = positionMap[0].length;
  const maxY = positionMap.length - 1 ;
  const slopes = [[1, 1], [3, 1], [5, 1], [7, 1], [1, 2]];

  const collisionsArr = slopes.map((slope) => {
    let position = [0, 0];
    let collisions = 0;
    while(position[1] <= maxY) {
      if (hasCollision(position, positionMap)) {
        collisions++
      }
      position = move(position, slope[0], slope[1], maxX);
    }
    return collisions
  });
  
  console.log(collisionsArr.reduce((acc, curr) => acc * curr));
}

const move = (previous, x, y, maxX) => {
  const [prevX, prevY] = previous;
  return [(prevX + x) % maxX, prevY + y];
}

const hasCollision = (position, input) => {
  const [xPos, yPos] = position;

  return input[yPos][xPos] === '#';
}

main();
