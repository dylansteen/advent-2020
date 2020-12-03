const util = require('util');
const fs = require('fs');
const readFile = util.promisify(fs.readFile);

function getValues() { 
  return readFile('input.txt', 'utf8').then((data) => data.split('\n')
    .filter(line => !!line)
    .map(line => line.split(':').map(value => value.trim()))
    .map(([rule, password]) => {
      const [limits, letter] = rule.split(' ');
      const [first, second] = limits.split('-').map(values => parseInt(values, 10) - 1);

      return { first, second, letter, password };
    }
  ));
}

async function main() {
  const values = await getValues();

  // use bitwise xor to do logical xor
  const result = values.filter(({ first, second, letter, password }) => password[first] === letter ^ password[second] === letter);
  
  console.log(result.length);
}

main();