const util = require('util');
const fs = require('fs');
const readFile = util.promisify(fs.readFile);

function getMap() { 
  return readFile('input.txt', 'utf8').then((data) => data.split('\n').filter(line => !!line));
}

async function main() {
  const positionMap = await getMap();
  let position = [0, 0];
  const maxX = positionMap[0].length;
  const maxY = positionMap.length - 1 ;

  let collisions = 0;
  while(position[1] <= maxY) {
    if (hasCollision(position, positionMap)) {
      collisions++
    }
    position = move(position, 3, 1, maxX);
  }
  
  console.log(collisions);
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
