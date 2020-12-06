const util = require('util');
const fs = require('fs');
const readFile = util.promisify(fs.readFile);

function getCustomsForms() { 
  return readFile('input.txt', 'utf8').then((data) => 
    data.split('\n\n')
    .filter(passport => !!passport)
  );
}

async function main() {
  const customsForms = await getCustomsForms();
  const result = customsForms.map(form => new Set(form.split('').filter(character => character !== '\n')).size);
  console.log(result.reduce((acc, counts) => acc + counts));
}
main();