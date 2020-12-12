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

        const north = oldSeats[y + 1] ? oldSeats[y + 1][x] : undefined;
        const northEast = oldSeats[y + 1] ? oldSeats[y + 1][x + 1] : undefined;
        const east = oldSeats[y][x + 1];
        const southEast = oldSeats[y - 1] ? oldSeats[y - 1][x + 1] : undefined;
        const south = oldSeats[y - 1] ? oldSeats[y - 1][x] : undefined;
        const southWest = oldSeats[y - 1] ? oldSeats[y - 1][x - 1] : undefined;
        const west = oldSeats[y][x - 1];
        const northWest = oldSeats[y + 1] ? oldSeats[y + 1][ x - 1] : undefined;

        const adjacentTakenSeats = [north, northEast, east, southEast, south, southWest, west, northWest].filter(seat => seat === '#');

        if (adjacentTakenSeats.length === 0) {
          newSeats[y][x] = '#';
        } else if (adjacentTakenSeats.length >= 4 && oldSeats[y][x] === '#') {
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

  console.log(result);
}

main();

const clone = (seatMap) => (
  [...seatMap.map(row => [...row])]
);

const isEqual = (oldSeats, newSeats) => oldSeats.every((row, index) => row.every((seat, rowIndex) => newSeats[index][rowIndex] === seat));

