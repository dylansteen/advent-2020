const util = require('util');
const fs = require('fs');
const readFile = util.promisify(fs.readFile);

function getTickets() { 
  return readFile('input.txt', 'utf8').then((data) => 
  data.split('\n')
  .filter(line => !!line));
}

async function main() {
  const tickets = await getTickets();

  const result = tickets.map(binaryTicket => {

    const [row, col] = [
      binaryTicket.substring(0, binaryTicket.length - 3),
      binaryTicket.substring(binaryTicket.length - 3, binaryTicket.length),
    ].map(binaryString => parseInt(binaryString, 2));

    return row * 8 + col;
  });
  
  result.forEach(seatId => { 
    if(!result.has(seatId + 1) && result.has(seatId + 2)) {
      console.log(seatId + 1);
    }
  });
}

main();