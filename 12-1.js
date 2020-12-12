const util = require('util');
const fs = require('fs');
const readFile = util.promisify(fs.readFile);

function getMovements() {
  return readFile('input.txt', 'utf8').then((data) =>
    data.split('\n')
  );
}

async function main() {
  const movements = await getMovements();

  let position = [0, 0];
  let dir = 0;

  movements.forEach(movement => {

    const [direction, ...dis] = movement;
    const distance = parseInt(dis.join(''));

    if (direction === 'F') {
      position = moveForward(dir, distance, position);
    } else if (direction === 'L' || direction === 'R') {
      dir = rotate(direction, distance, dir);
    } else if (['N', 'E', 'S', 'W'].includes(direction)) {
      position = translate(direction, distance, position);
    }

  });

  console.log(Math.abs(position[0]) + Math.abs(position[1]))
}

main();

const translate = (direction, distance, position) => {
  if (direction === 'N') {
    return [position[0], position[1] + distance];
  }
  if (direction === 'E') {
    return [position[0] + distance, position[1]];
  }
  if (direction === 'S') {
    return [position[0], position[1] - distance];
  }
  if (direction === 'W') {
    return [position[0] - distance, position[1]];
  }
}

const rotate = (direction, distance, currentDir) => {
  if (direction === 'R') {
    return currentDir - distance;
  }
  return currentDir + distance;
}

const moveForward = (previousDirection, distance, position) => {
  const xMovement = distance * Math.cos(previousDirection * Math.PI / 180);
  const yMovement = distance * Math.sin(previousDirection * Math.PI / 180);

  return [position[0] + xMovement, position[1] + yMovement];
}