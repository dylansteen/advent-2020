const util = require('util');
const fs = require('fs');
const readFile = util.promisify(fs.readFile);

function getBags() { 
  return readFile('input.txt', 'utf8').then((data) => 
    data.split('\n')
      .filter(bags => !!bags)
  );
}

let counter = 0;

async function main() {
  const bags = await getBags();
  startingRule = bags.find(bag => bag.startsWith('shiny gold'));

  getInnerBags(startingRule, bags);
  console.log(counter);
}

const getInnerBags = (bag, allBags) => {

  if(bag.includes('contain no other bags')) {
    return;
  }

  const rules = split(bag);
  const mappedRules = rules.map(rule => { 
    const words = rule.split(' ');
    return parseInt(words[0]) ? [`${words[1]} ${words[2]}`, parseInt(words[0])] : undefined;
  }).filter(x => !!x);

  

  mappedRules.forEach(mappedRule => {
    Array.from(Array(mappedRule[1])).forEach(() =>  {
      counter++;
      const nextBag = allBags.find(bag => bag.startsWith(mappedRule[0]));
      getInnerBags(nextBag, allBags);
    });
  });

}

const split = (bag) => bag.split(/,|contain/).map(rule => rule.trim());

main();