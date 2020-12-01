const util = require('util');
const fs = require('fs');
const readFile = util.promisify(fs.readFile);

function getAmounts() { 
  return readFile('input.txt', 'utf8').then((data) => data.split('\n').map(amount => +amount).filter(amount => !!amount));
}

async function main() {
  const amounts = await getAmounts();

  const firstEntry = amounts.find(amount => amounts.some((otherAmount => amount + otherAmount === 2020)));

  console.log((2020 - firstEntry) * firstEntry);
}

main();