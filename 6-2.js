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
    const people = form.split('\n');
    const answers = people.reduce((acc, curr) => [...acc, ...curr], []);
    const uniqueAnswers = new Set(answers);
    let res = 0;

    uniqueAnswers.forEach(uniqueAnswer => {
      if (answers.filter(answer => answer === uniqueAnswer).length === people.length) {
        res += 1;
      };
    });

    return res;
  });
  console.log(result.reduce((acc, counts) => acc + counts));
}
main();