const util = require('util');
const fs = require('fs');
const readFile = util.promisify(fs.readFile);

function getValues() { 
  return readFile('input.txt', 'utf8').then((data) => data.split('\n')
    .filter(line => !!line)
    .map(line => line.split(':'))
    .map(([rule, password]) => {
      const [limits, letter] = rule.split(' ');
      const [min, max] = limits.split('-').map(values => parseInt(values, 10));

      return { min, max, letter, password };
    }
  ));
}

async function main() {
  const values = await getValues();

  const result = values.filter(({ min, max, letter, password }) => {
    const count = password.split('').filter(passwordLetter => letter === passwordLetter).length;
    return min <= count && max >= count
  });
  
  console.log(result.length);
}

main();