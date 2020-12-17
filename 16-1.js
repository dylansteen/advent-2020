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

  const result = otherTickets.map(ticket => {
    const values = ticket.split(',').map(val => parseInt(val));

    return values.filter(val => !Object.values(rules).some(fn => fn((val))));
  }).reduce((acc, arr) => acc + arr.reduce((innerAcc, curr) => innerAcc + curr, 0), 0);

  console.log(result);
}

const rules = {};

main();
