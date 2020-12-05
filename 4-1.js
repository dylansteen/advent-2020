const util = require('util');
const fs = require('fs');
const readFile = util.promisify(fs.readFile);

function getPassports() { 
  return readFile('input.txt', 'utf8').then((data) => 
  data.split('\n\n').filter(passport => !!passport));
}

async function main() {
  const passports = await getPassports();

  const result = passports.reduce((acc, passport) => {
    const fields = passport.split(/\b(\s)/).filter(field => !!field.trim());

    if (fields.length === 8 || !fields.some(field => field.split(':')[0] === 'cid') && fields.length === 7) {
      return acc + 1;
    }

    return acc;
  }, 0);

  console.log(result);
}


main();
