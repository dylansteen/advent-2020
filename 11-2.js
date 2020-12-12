const util = require('util');
const fs = require('fs');
const readFile = util.promisify(fs.readFile);

function getSeats() {
  return readFile('input.txt', 'utf8').then((data) =>
    data.split('\n')
  );
}

async function main() {
  const seatMap = await getSeats();

  console.time('timer')
  let done = false;
  let newSeats = clone(seatMap);
  let oldSeats = clone(newSeats);

  while(!done) {

    newSeats = clone(oldSeats);
    
    for(let y = 0; y < seatMap.length; y++) {
      for (let x = 0; x < seatMap[0].length; x++) {

        if (oldSeats[y][x] === '.') {
          continue;
        }

        const north = seesAny([x,y], [0, -1], oldSeats);
        const northEast = seesAny([x,y], [1, -1], oldSeats);
        const east = seesAny([x,y], [1, 0], oldSeats);
        const southEast = seesAny([x,y], [1, 1], oldSeats);
        const south = seesAny([x,y], [0, 1], oldSeats);
        const southWest = seesAny([x,y], [-1, 1], oldSeats);
        const west = seesAny([x,y], [-1, 0], oldSeats);
        const northWest = seesAny([x,y], [-1, -1], oldSeats);

        const adjacentTakenSeats = [north, northEast, east, southEast, south, southWest, west, northWest].filter(seesAny => seesAny);

        if (adjacentTakenSeats.length === 0) {
          newSeats[y][x] = '#';
        } else if (adjacentTakenSeats.length >= 5 && oldSeats[y][x] === '#') {
          newSeats[y][x] = 'L'
        }
      }
    }

    done = isEqual(oldSeats, newSeats);

    oldSeats = newSeats;
  }

  const result = oldSeats.reduce((acc, curr) => {
    return acc + curr.filter(char => char === '#').length;
  }, 0);

  console.timeEnd('timer')
  console.log(result);
}

main();

const clone = (seatMap) => (
  [...seatMap.map(row => [...row])]
);

const isEqual = (oldSeats, newSeats) => oldSeats.every((row, index) => row.every((seat, rowIndex) => newSeats[index][rowIndex] === seat));

const seesAny = (position, direction, map) => {
  const [xDir, yDir] = direction;

  let [xPos, yPos] = position
  
  xPos += xDir;
  yPos += yDir;
  
  while (map[yPos] !== undefined && map[yPos][xPos] !== undefined) {
    if (map[yPos][xPos] === '#') {
      return true;
    }

    if (map[yPos][xPos] === 'L') {
      return false;
    }

    xPos += xDir;
    yPos += yDir;
  }

  return false;
}

