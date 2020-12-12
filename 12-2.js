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
  let wayPoint = [10, 1];
  let dir = 0;


  movements.forEach(movement => {
    const [direction, ...dis] = movement;
    const distance = parseInt(dis.join(''));

    if (direction === 'F') {
      [position, wayPoint] = moveForward(distance, position, wayPoint);
    } else if (direction === 'L' || direction === 'R') {
      wayPoint = rotate(direction, distance, position, wayPoint);
    } else if (['N', 'E', 'S', 'W'].includes(direction)) {
      wayPoint = translate(direction, distance, wayPoint);
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

const rotate = (direction, angle, position, wayPoint) => {

  let newWay = [...wayPoint];
  const xMovement = wayPoint[0] - position[0];
  const yMovement = wayPoint[1] - position[1];
  let realAngle;

  if (direction === 'L' || angle === 180) {
    realAngle = angle;
  } else if (angle === 90) {
    realAngle = 270
  } else {
    realAngle = 90;
  }

  if (realAngle === 180) {
    newWay = [position[0] - xMovement, position[1] - yMovement];
  }

  if (realAngle === 90) {
    newWay = [position[0] - yMovement, position[1] + xMovement]; 
  }

  if (realAngle === 270) {
    newWay = [position[0] + yMovement, position[1] - xMovement]; 
  }

  return newWay;
}

const moveForward = (movementCount, position, wayPoint) => {
  const xMovement = wayPoint[0] - position[0];
  const yMovement = wayPoint[1] - position[1];

  const [newPos, newWaypoint] = [[...position], [...wayPoint]];
  while (movementCount > 0) {
    newPos[0] = newPos[0] + xMovement;
    newWaypoint[0] = newWaypoint[0] + xMovement;

    newPos[1] = newPos[1] + yMovement;
    newWaypoint[1] = newWaypoint[1] + yMovement;

    movementCount--;
  }

  return [newPos, newWaypoint];
}