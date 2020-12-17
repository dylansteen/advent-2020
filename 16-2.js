const util = require('util');
const fs = require('fs');
const readFile = util.promisify(fs.readFile);

function getData() {
  return readFile('input.txt', 'utf8').then((data) =>
    data.split('\n\n'));
}

async function main() {
  const [rulesString, myTicketData, otherTicketData] = await getData();

  rulesString.split('\n').forEach(rule => {
    const [name, values] = rule.split(':');

    const ranges = values.split('or').map(range => {
      const [min, max] = range.split('-').map(val => parseInt(val));
      return { min, max };
    });

    rules[name] = (val) => ranges.some(range => val >= range.min && val <= range.max);
  });

  const [_, ...otherTickets] = otherTicketData.split('\n');

  const validOtherTickets = otherTickets.filter(ticket => {
    const values = ticket.split(',').map(val => parseInt(val));

    return values.every(val => Object.values(rules).some(fn => fn((val))));
  });

  
  const [__, myTicket] = myTicketData.split('\n');

  const allValidTickets = [myTicket, ...validOtherTickets].map(ticket => ticket.split(',').map(val => parseInt(val)));
  const departureVals = [];

 
  let counter = 0;
  while(Object.keys(rules).length) {
    const ruleName = Object.keys(rules)[counter];
    const validatorFn = rules[ruleName];
    let foundIndex = -1;
    const validIndices = myTicket.split(',').filter((_, index) => {
      const isValid = allValidTickets.map(tickets => tickets[index]).every(val => validatorFn(val));
      if (isValid) {
        foundIndex = index;
      }
      return isValid;
    });

    if (validIndices.length === 1) {
      allValidTickets.forEach(ticket => ticket[foundIndex] = -1);

      if (ruleName.startsWith('departure')) {
        departureVals.push(myTicket.split(',')[foundIndex]);
      }
      counter = 0;
      delete rules[ruleName];
    } else {
      counter++;
    }
  }


  console.log(departureVals.map(x => BigInt(x)).reduce((acc, val) => acc * val));
}

const rules = {};

main();
