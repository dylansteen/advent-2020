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
  const result = customsForms.map(form => { 
    const peoplesAnswers = form.split('\n');
    const groupsAnswers = peoplesAnswers.reduce((acc, curr) => [...acc, ...curr], []);
    const groupsUniqueAnswers = [...new Set(groupsAnswers)];

    return groupsUniqueAnswers.filter(uniqueAnswer => groupsAnswers.filter(answer => answer === uniqueAnswer).length === peoplesAnswers.length).length;
  });
  console.log(result.reduce((acc, counts) => acc + counts));
}
main();