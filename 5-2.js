const util = require('util');
const fs = require('fs');
const readFile = util.promisify(fs.readFile);

function getTickets() { 
  return readFile('input.txt', 'utf8').then((data) => 
  data.split('\n').filter(line => !!line).map(row => row.split('')));
}

async function main() {
  const tickets = await getTickets();

  let result = new Set(tickets.map((ticket) => {
    let maxRow = 127;
    let minRow = 0

    let maxCol = 7;
    let minCol = 0

    ticket.forEach((character) => {
       if (character === 'B') {
        minRow = upperHalf(minRow, maxRow);
      }

      if (character === 'F') {
        maxRow = lowerHalf(minRow, maxRow);
      }

      if (character === 'R') {
        minCol = upperHalf(minCol, maxCol);
      }

      if (character === 'L') {
        maxCol = lowerHalf(minCol, maxCol);
      }
    });
    return minRow * 8 + minCol;
  }));
  

  result.forEach(seatId => { 
    if(!result.has(seatId + 1) && result.has(seatId + 2)) {
      console.log(seatId) + 1;
    }
  });
}

main();

const lowerHalf = (min, max) => (min + max - 1) / 2;
const upperHalf = (min, max) => (min + max + 1) / 2;