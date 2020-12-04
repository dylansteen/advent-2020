const util = require('util');
const fs = require('fs');
const readFile = util.promisify(fs.readFile);

function getMap() { 
  return readFile('input.txt', 'utf8').then((data) => data.split('\n').filter(line => !!line));
}

async function main() {
  const positionMap = await getMap();
  const maxX = positionMap[0].length;

  let xPos = 0;

  const collisions = positionMap.reduce((acc, row) => {
    const result = hasCollision(xPos, row) ? acc + 1 : acc;
    xPos = move(xPos, 3, maxX);
    return result;
  }, 0);
  console.log(collisions);
}

const move = (previous, x, maxX) =>  (previous + x) % maxX;
const hasCollision = (xPos, row) => row[xPos] === '#';

main();
