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
  const [first, ...startingRule] = split(bags.find(bag => bag.startsWith('shiny gold')));

  const result = startingRule.reduce((acc,rule) => acc + getInnerBags(rule, bags, 0), 0);
}

const getInnerBags = (bag, allBags, total) => {

  if (bag.includes('contain no other bags')) {
    return total + 1;
  }

  const rules = split(bag);
  const mappedRules = rules.map(rule => { 
    const words = rule.split(' ');
    return parseInt(words[0]) ? [`${words[1]} ${words[2]}`, parseInt(words[0])] : undefined;
  }).filter(x => !!x);

  
  let x = 0;
  return mappedRules.map((mappedRule) => {
    const emptyArray = Array.from(Array(mappedRule[1]));
    return emptyArray.map((curr) =>  {
      console.log(mappedRule[0]);
      const nextBag = allBags.find(bag => bag.startsWith(mappedRule[0]));
      const toReturn = getInnerBags(nextBag, allBags, total);
      return toReturn;
    });
  });

}

const split = (bag) => bag.split(/,|contain/).map(rule => rule.trim());

main();