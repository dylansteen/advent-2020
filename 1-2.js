const util = require('util');
const fs = require('fs');
const readFile = util.promisify(fs.readFile);

function getAmounts() { 
  return readFile('input.txt', 'utf8').then((data) => data.split('\n').map(amount => +amount).filter(amount => !!amount));
}

async function main() {
  const amounts = await getAmounts();

  for (amount of amounts) {
    for (secondAmount of amounts) {
      for (thirdAmount of amounts) {
        if (amount + secondAmount + thirdAmount === 2020) {
          console.log(amount * secondAmount * thirdAmount);
          return;
        }
      }
    }
  }
}

main();