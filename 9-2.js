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
  const numbers = await getNumbers();
  const magicNumber = 1124361034;

  numbers.find((_number, index) => {
    let windowSize = 0;

    while(windowSize + index <= numbers.length) {
      const maxIndex = index + windowSize;
      const lookaheadWindow = numbers.slice(index, maxIndex);
      const sum = lookaheadWindow.reduce((acc, curr) => acc + curr, 0);
      if (sum === magicNumber) {
        console.log(Math.min(...lookaheadWindow) + Math.max(...lookaheadWindow));
        return true;
      }

      windowSize++;
    }
  });
}

main();