const util = require('util');
const fs = require('fs');
const readFile = util.promisify(fs.readFile);

function getNumbers() { 
  return readFile('input.txt', 'utf8').then((data) => 
    data.split('\n')
      .filter(number => Number.isInteger(+number))
      .map(number => parseInt(number)),
  );
}

async function main() {
  const lookBack = 25;
  const numbers = await getNumbers();

  const result = numbers.find((number, index) => {
    if (index < lookBack) {
      return false;
    }

    const lookBackWindow = numbers.slice(index - lookBack, index);

    return !lookBackWindow.find(lookNumber1 => lookBackWindow.some(lookNumber2 => lookNumber1 + lookNumber2 === number))
  });

  console.log(result);
}

main();
