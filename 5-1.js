const util = require('util');
const fs = require('fs');
const readFile = util.promisify(fs.readFile);

function getTickets() { 
  return readFile('input.txt', 'utf8').then((data) => 
  data.split('\n')
  .filter(line => !!line)
  .map(ticket => ticket.replace(/[BR]/g, '1').replace(/[FL]/g, '0')));
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

  console.log(result.reduce((acc, curr) => curr > acc ? curr : acc));
}

main();