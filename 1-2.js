const util = require('util');
const fs = require('fs');
const readFile = util.promisify(fs.readFile);

function getAmounts() { 
  return readFile('input.txt', 'utf8').then((data) => data.split('\n').map(amount => +amount).filter(amount => !!amount));
}

async function main() {
  const amounts = await getAmounts();
  const setAmounts = new Set(amounts);


  for (amount of amounts) {
    for (secondAmount of amounts) {
      if (setAmounts.has((2020 - amount - secondAmount))) {
        console.log(amount * secondAmount * (2020 - amount - secondAmount));
        return;
      }
    }
  }
}

main();