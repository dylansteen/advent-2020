const util = require('util');
const fs = require('fs');
const readFile = util.promisify(fs.readFile);

function getData() {
  return readFile('input.txt', 'utf8').then((data) =>
    data.split(',').map(x => parseInt(x)));
}

async function main() {
  const numbers = await getData();
  let time = numbers.length + 1;

  numbers.forEach((number, index) => ages[number] = [index + 1]);
  let last = numbers[numbers.length - 1];

  while(time <= 30000000) {
    if(ages[last].length === 1) {
      ages[0].push(time);
      last = 0;
    } else {
      const ageArr = ages[last];
      last = ageArr[ageArr.length - 1] - ageArr[ageArr.length - 2];
      if (ages[last]) {
        ages[last].push(time);
      } else {
        ages[last] = [time];
      }
    }
    time++;
  }

  console.log(last);

}

const ages = {};

main();
