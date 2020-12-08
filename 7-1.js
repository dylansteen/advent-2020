const util = require('util');
const fs = require('fs');
const readFile = util.promisify(fs.readFile);

function getBags() { 
  return readFile('input.txt', 'utf8').then((data) => 
    data.split('\n')
      .filter(bags => !!bags)
  );
}

async function main() {
  const bags = await getBags();
  const result = bags.map(bag => getInnerBags(bag, bags)).filter(x => x).length;

  console.log(result);
}

const getInnerBags = (bag, allBags) => {
  if (!bag) {
    return false;
  }

  if (bag.includes('shiny gold') && !bag.startsWith('shiny gold')) {
    return true;
  }

  const rules = split(bag);

  const mappedRules = rules.map(rule => { 
    const words = rule.split(' ');
    return `${words[1]} ${words[2]}`;
  })

  return mappedRules.some(mappedRule => getInnerBags(allBags.find(bag => bag.startsWith(mappedRule)), allBags));

}

const split = (bag) => bag.split(/,|contain/).map(rule => rule.trim());

main();