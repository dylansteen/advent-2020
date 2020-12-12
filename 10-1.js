const util = require('util');
const fs = require('fs');
const readFile = util.promisify(fs.readFile);

function getJoltages() {
  return readFile('input.txt', 'utf8').then((data) =>
    `0\n${data}`.split('\n')
      .filter(number => Number.isInteger(+number))
      .map(number => parseInt(number))
      .sort((a, b) => a - b),
  );
}

async function main() {
  const joltages = await getJoltages();

  const joltageMap = { '1': 0, '2': 0, '3': 1 };

  const result = joltages.reduce((acc, joltage, index) => {
    const nextJoltage = joltages[index + 1];

    if (!nextJoltage) {
      return acc;
    }

    const diff = nextJoltage - joltage;

    return {
      ...acc,
      [diff]: acc[diff] + 1,
    }

  }, joltageMap)

  console.log(result[1] * result[3]);
}

main();